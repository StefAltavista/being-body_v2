import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const publicDir = path.join(root, "public");
const imagePattern = /\.(?:png|jpe?g|webp|avif|gif|svg|ico)$/i;
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const file = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(file) : [file];
});
const images = walk(publicDir).filter((file) => imagePattern.test(file));
const used = new Map();
const missing = new Set();
const visited = new Set();
const queue = walk(path.join(root, "src/app")).filter((file) => /\/(?:page|layout|route|not-found|error|global-error|loading|template|default|icon|apple-icon|opengraph-image|twitter-image|manifest)\.[jt]sx?$/.test(file));
queue.push(...walk(path.join(root, "src/pages")).filter((file) => /\.[jt]sx?$/.test(file)));

function reference(url, file) {
  if (!url.startsWith("/") || url.startsWith("//")) return;
  const clean = url.split(/[?#]/)[0];
  if (!imagePattern.test(clean)) return;
  const full = path.join(publicDir, clean);
  if (!fs.existsSync(full)) missing.add(`${clean} (${path.relative(root, file)})`);
  else used.set(full, [...new Set([...(used.get(full) ?? []), path.relative(root, file)])]);
}

function enqueue(specifier, from) {
  if (!specifier.startsWith(".") && !specifier.startsWith("@/")) return;
  const base = specifier.startsWith("@/") ? path.join(root, "src", specifier.slice(2)) : path.resolve(path.dirname(from), specifier);
  const file = [base, ...[".ts", ".tsx", ".js", ".jsx", ".css", "/index.ts", "/index.tsx"].map((ext) => base + ext)].find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (file && /\.(?:[jt]sx?|css)$/.test(file)) queue.push(file);
}

while (queue.length) {
  const file = queue.shift();
  if (visited.has(file)) continue;
  visited.add(file);
  const source = fs.readFileSync(file, "utf8");
  if (file.endsWith(".css")) {
    const css = source.replace(/\/\*[\s\S]*?\*\//g, "");
    for (const match of css.matchAll(/url\(\s*["']?([^"')\s]+)/g)) reference(match[1], file);
    for (const match of css.matchAll(/@import\s+["']([^"']+)/g)) enqueue(match[1], file);
    continue;
  }
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  function visit(node) {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) enqueue(node.moduleSpecifier.text, file);
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && ts.isStringLiteral(node.arguments[0])) enqueue(node.arguments[0].text, file);
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) reference(node.text, file);
    if (ts.isTemplateExpression(node) && /^\/(img|photos|icons)\//.test(node.head.text)) {
      // Current runtime templates select PNG/WebP in About and Contacts.
      // Fail closed for any future dynamic path that this audit cannot resolve.
      if (node.templateSpans.length === 1 && node.templateSpans[0].expression.getText(tree) === "format" && node.templateSpans[0].literal.text === "") {
        for (const format of ["png", "webp"]) reference(node.head.text + format, file);
      } else throw new Error(`Unresolved image template in ${file}: ${node.getText(tree)}`);
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
}

const rows = images.map((file) => ({ path: path.relative(root, file), bytes: fs.statSync(file).size, references: used.get(file) ?? [] }));
const unused = rows.filter((row) => row.references.length === 0);
const report = { scannedModules: visited.size, totalImages: rows.length, totalBytes: rows.reduce((sum, row) => sum + row.bytes, 0), usedImages: rows.length - unused.length, unusedImages: unused.length, unusedBytes: unused.reduce((sum, row) => sum + row.bytes, 0), missing: [...missing], images: rows };
const output = process.argv.find((arg) => arg.startsWith("--report="))?.slice(9);
if (output) fs.writeFileSync(output, JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ ...report, images: undefined }, null, 2));
if (missing.size) process.exitCode = 1;
else if (process.argv.includes("--prune")) {
  for (const row of unused) fs.unlinkSync(path.join(root, row.path));
  console.log(`Deleted ${unused.length} unreachable public images.`);
}

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Lossless conversion only: retain source resolution, framing and decoded colors.
// PNG cursors/social images and the runtime PNG/WebP variants remain supported.
const convert = [
  "icons/Menu_closed.png", "icons/Menu_open.png",
  "img/aroma.png", "img/bubbles.png", "img/hands_tr2.png", "img/logo.png",
  "img/logo_small.png", "img/massageBG.png", "img/pilatesBG.png", "img/welcome_new.png",
  ...["cc", "ff", "rr", "ss", "zz"].flatMap((oil) => [`img/oils/${oil}-foto.png`, `img/oils/${oil}-logo.png`]),
];
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const file = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(file) : [file];
});
const sources = walk("src").filter((file) => /\.(tsx?|css)$/.test(file));
const changes = [];
for (const relative of convert) {
  const input = path.join("public", relative);
  if (!fs.existsSync(input)) continue;
  const output = input.replace(/\.png$/, ".webp");
  if (fs.existsSync(output)) throw new Error(`Refusing to overwrite ${output}`);
  const encoded = await sharp(input).rotate().webp({ lossless: true, effort: 6 }).toBuffer();
  const before = await sharp(input).rotate().ensureAlpha().raw().toBuffer();
  const after = await sharp(encoded).ensureAlpha().raw().toBuffer();
  if (before.length !== after.length) throw new Error(`Dimensions changed: ${input}`);
  for (let i = 0; i < before.length; i += 4) {
    if (before[i + 3] !== after[i + 3] || (before[i + 3] !== 0 && (before[i] !== after[i] || before[i + 1] !== after[i + 1] || before[i + 2] !== after[i + 2]))) {
      throw new Error(`Visible decoded pixels changed: ${input} at ${i / 4}`);
    }
  }
  const originalBytes = fs.statSync(input).size;
  if (encoded.length >= originalBytes) continue;
  fs.writeFileSync(output, encoded);
  for (const file of sources) {
    const source = fs.readFileSync(file, "utf8");
    const updated = source.replaceAll(`/${relative}`, `/${relative.replace(/\.png$/, ".webp")}`);
    if (source !== updated) fs.writeFileSync(file, updated);
  }
  fs.unlinkSync(input);
  changes.push({ from: input, to: output, originalBytes, optimizedBytes: encoded.length, visiblePixelsIdentical: true });
}
if (changes.length) {
  fs.writeFileSync("docs/lossless-image-optimization.json", JSON.stringify(changes, null, 2) + "\n");
}
console.log(JSON.stringify({ converted: changes.length, savedBytes: changes.reduce((sum, row) => sum + row.originalBytes - row.optimizedBytes, 0) }, null, 2));

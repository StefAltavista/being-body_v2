import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const oilDirectory = path.join(process.cwd(), "public", "img", "oils");
const files = fs
  .readdirSync(oilDirectory)
  .filter((file) => /-(?:foto|logo)\.webp$/.test(file))
  .sort();

const results = [];
for (const file of files) {
  const sourcePath = path.join(oilDirectory, file);
  const temporaryPath = `${sourcePath}.tmp`;
  const sourceBytes = fs.statSync(sourcePath).size;
  const isPhoto = file.endsWith("-foto.webp");
  const maxWidth = isPhoto ? 1200 : 800;
  const sourceMetadata = await sharp(sourcePath).metadata();
  // Once a file is at its display ceiling, leave it alone so rerunning the
  // utility never applies a second lossy WebP encode.
  if ((sourceMetadata.width ?? 0) <= maxWidth) continue;

  const buffer = await sharp(sourcePath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toBuffer();
  const metadata = await sharp(buffer).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`Could not read generated dimensions: ${file}`);
  }

  fs.writeFileSync(temporaryPath, buffer);
  fs.renameSync(temporaryPath, sourcePath);
  results.push({
    path: `public/img/oils/${file}`,
    sourceBytes,
    optimizedBytes: buffer.length,
    width: metadata.width,
    height: metadata.height,
    quality: 88,
  });
}

if (results.length) {
  fs.writeFileSync(
    path.join(process.cwd(), "docs", "oil-image-optimization.json"),
    JSON.stringify(results, null, 2) + "\n",
  );
}

console.log(JSON.stringify({
  optimized: results.length,
  sourceBytes: results.reduce((sum, row) => sum + row.sourceBytes, 0),
  optimizedBytes: results.reduce((sum, row) => sum + row.optimizedBytes, 0),
  savedBytes: results.reduce((sum, row) => sum + row.sourceBytes - row.optimizedBytes, 0),
  results,
}, null, 2));

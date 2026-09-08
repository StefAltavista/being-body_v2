import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// These photographs are displayed inside bounded containers. Keeping a 2x
// source at the largest rendered width preserves the existing object-cover
// crop while removing camera metadata and pixels the UI can never display.
const photos = [
  { source: "img/homeCarousel/1.jpg", output: "img/homeCarousel/1.webp", width: 1080 },
  { source: "photos/massage1.jpg", output: "photos/massage1.webp", width: 1280 },
  { source: "photos/massage2.jpg", output: "photos/massage2.webp", width: 1200 },
  { source: "photos/pilates2.jpg", output: "photos/pilates2.webp", width: 1000 },
];

const root = process.cwd();
const results = [];

for (const photo of photos) {
  const sourcePath = path.join(root, "public", photo.source);
  const outputPath = path.join(root, "public", photo.output);
  if (!fs.existsSync(sourcePath) && fs.existsSync(outputPath)) continue;
  if (!fs.existsSync(sourcePath)) throw new Error(`Missing source image: ${photo.source}`);
  if (fs.existsSync(outputPath)) throw new Error(`Refusing to overwrite ${photo.output}`);

  const input = sharp(sourcePath).rotate();
  const metadata = await input.metadata();
  const buffer = await input
    .resize({ width: photo.width, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toBuffer();
  const outputMetadata = await sharp(buffer).metadata();

  if (!outputMetadata.width || !outputMetadata.height) {
    throw new Error(`Could not read generated dimensions: ${photo.output}`);
  }
  if (outputMetadata.width > (metadata.autoOrient?.width ?? metadata.width ?? photo.width)) {
    throw new Error(`Generated image is wider than its source: ${photo.output}`);
  }

  fs.writeFileSync(outputPath, buffer);
  const sourceBytes = fs.statSync(sourcePath).size;
  results.push({
    from: `public/${photo.source}`,
    to: `public/${photo.output}`,
    sourceBytes,
    optimizedBytes: buffer.length,
    width: outputMetadata.width,
    height: outputMetadata.height,
    quality: 88,
  });

  // The code references the optimized derivative after this script runs, so
  // the high-resolution camera original can be removed safely.
  fs.unlinkSync(sourcePath);
}

if (results.length) {
  fs.writeFileSync(
    path.join(root, "docs", "responsive-image-optimization.json"),
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

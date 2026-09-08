import http from "node:http";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Open http://127.0.0.1:3102 and click Render with a local Next server running.
// Rendering in the browser preserves CSS filter order, alpha and sRGB behavior.
const origin = process.argv[2] ?? "http://127.0.0.1:3000";
if (!["localhost", "127.0.0.1", "[::1]"].includes(new URL(origin).hostname)) {
  throw new Error("The artwork renderer requires a local Next server.");
}
const names = new Set(["concept-sharp-1x", "concept-sharp-2x", "concept-soft-1x", "concept-soft-2x"]);
http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1:3102");
    if (req.method === "GET" && url.pathname === "/") {
      res.setHeader("Content-Type", "text/html");
      return res.end(fs.readFileSync(fileURLToPath(new URL("./render-concept-artwork.html", import.meta.url))));
    }
    if (req.method === "GET" && url.pathname === "/source") {
      const width = url.searchParams.get("w");
      if (!["640", "1080"].includes(width)) throw new Error("Unsupported width");
      const response = await fetch(`${origin}/_next/image?url=%2Fimg%2Fbubbles.webp&w=${width}&q=75`, { headers: { Accept: "image/webp" } });
      if (!response.ok) throw new Error(`Source returned ${response.status}`);
      res.setHeader("Content-Type", "image/webp");
      return res.end(Buffer.from(await response.arrayBuffer()));
    }
    if (req.method === "POST" && url.pathname === "/save") {
      const chunks = [];
      let size = 0;
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 15_000_000) throw new Error("Image exceeds upload limit");
        chunks.push(chunk);
      }
      const { name, data } = JSON.parse(Buffer.concat(chunks).toString());
      if (!names.has(name) || !data.startsWith("data:image/png;base64,")) throw new Error("Invalid artwork");
      const png = Buffer.from(data.split(",")[1], "base64");
      const { width, height } = await sharp(png).metadata();
      const expected = name.endsWith("1x") ? [640, 853] : [1080, 1440];
      if (width !== expected[0] || height !== expected[1]) throw new Error("Unexpected artwork dimensions");
      fs.mkdirSync("public/img/rendered", { recursive: true });
      await sharp(png).webp({ lossless: true, effort: 6 }).toFile(`public/img/rendered/${name}.webp`);
      return res.end("Saved");
    }
    res.writeHead(404).end();
  } catch (error) {
    res.writeHead(400).end(error.message);
  }
}).listen(3102, "127.0.0.1", () => console.log("Render artwork at http://127.0.0.1:3102"));

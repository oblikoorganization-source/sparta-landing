// Media pipeline for Sparta site.
// 1. Convert HEIC -> JPG
// 2. Resize every source image -> web JPG in _content/_web/ (for review/cataloguing)
// 3. Try to render logo.ai (PDF-compatible) -> PNG via sharp
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import heicConvert from "heic-convert";

const ROOT = path.resolve(".");
const CONTENT = path.join(ROOT, "_content");
const OUT = path.join(CONTENT, "_web");
const SRC_DIRS = ["docs", "photos"];

const MAX_W = 1600;
const Q = 82;

await fs.mkdir(OUT, { recursive: true });

const manifest = [];

async function toJpgBuffer(file) {
  const ext = path.extname(file).toLowerCase();
  const buf = await fs.readFile(file);
  if (ext === ".heic") {
    const out = await heicConvert({ buffer: buf, format: "JPEG", quality: 0.92 });
    return Buffer.from(out);
  }
  return buf;
}

for (const dir of SRC_DIRS) {
  const abs = path.join(CONTENT, dir);
  let files = [];
  try {
    files = await fs.readdir(abs);
  } catch {
    continue;
  }
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".heic"].includes(ext)) continue;
    const full = path.join(abs, f);
    const base = f.replace(/\.[^.]+$/, "");
    try {
      const jpg = await toJpgBuffer(full);
      const meta = await sharp(jpg).metadata();
      const outName = `${base}.jpg`;
      await sharp(jpg)
        .rotate()
        .resize({ width: MAX_W, withoutEnlargement: true })
        .jpeg({ quality: Q, mozjpeg: true })
        .toFile(path.join(OUT, outName));
      manifest.push({
        src: `${dir}/${f}`,
        web: outName,
        w: meta.width,
        h: meta.height,
        orient: meta.width >= meta.height ? "landscape" : "portrait",
      });
      console.log("ok", outName, `${meta.width}x${meta.height}`);
    } catch (e) {
      console.log("FAIL", f, e.message);
    }
  }
}

// logo
try {
  const logo = path.join(CONTENT, "_logo", "logo.ai");
  await sharp(logo, { density: 300 })
    .resize({ width: 1200, withoutEnlargement: true })
    .png()
    .toFile(path.join(OUT, "_logo.png"));
  console.log("logo rendered");
} catch (e) {
  console.log("logo render failed:", e.message);
}

await fs.writeFile(path.join(OUT, "_manifest.json"), JSON.stringify(manifest, null, 2));
console.log("\nTOTAL", manifest.length, "images ->", OUT);

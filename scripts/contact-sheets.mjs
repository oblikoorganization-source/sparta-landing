// Build labeled contact sheets from _content/_web so all media can be reviewed at once.
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const WEB = path.resolve("_content/_web");
const OUT = path.resolve("_content/_sheets");
await fs.mkdir(OUT, { recursive: true });

const files = (await fs.readdir(WEB))
  .filter((f) => f.endsWith(".jpg") && !f.startsWith("_"))
  .sort();

const CELL = 360;
const LABEL = 30;
const COLS = 4;
const PER_SHEET = 16; // 4x4

function labelFor(name) {
  // 532870__IMG_9301.jpg -> "9301"  | 531432.jpg -> "531432"
  const m = name.match(/IMG_([0-9]+)/i);
  return m ? m[1] : name.replace(".jpg", "");
}

async function makeCell(file) {
  const img = await sharp(path.join(WEB, file))
    .resize(CELL, CELL, { fit: "contain", background: "#111" })
    .toBuffer();
  const label = labelFor(file);
  const svg = Buffer.from(
    `<svg width="${CELL}" height="${LABEL}"><rect width="100%" height="100%" fill="#d61f26"/><text x="8" y="21" font-family="monospace" font-size="18" fill="#fff">${label}</text></svg>`
  );
  return sharp({
    create: { width: CELL, height: CELL + LABEL, channels: 3, background: "#000" },
  })
    .composite([
      { input: img, top: 0, left: 0 },
      { input: svg, top: CELL, left: 0 },
    ])
    .jpeg()
    .toBuffer();
}

let sheet = 0;
for (let i = 0; i < files.length; i += PER_SHEET) {
  const batch = files.slice(i, i + PER_SHEET);
  const cells = await Promise.all(batch.map(makeCell));
  const rows = Math.ceil(batch.length / COLS);
  const W = COLS * CELL;
  const H = rows * (CELL + LABEL);
  const composites = cells.map((buf, idx) => ({
    input: buf,
    top: Math.floor(idx / COLS) * (CELL + LABEL),
    left: (idx % COLS) * CELL,
  }));
  const name = `sheet-${String(sheet).padStart(2, "0")}.jpg`;
  await sharp({ create: { width: W, height: H, channels: 3, background: "#000" } })
    .composite(composites)
    .jpeg({ quality: 78 })
    .toFile(path.join(OUT, name));
  console.log(name, "->", batch.map(labelFor).join(", "));
  sheet++;
}
console.log("\nDONE", sheet, "sheets");

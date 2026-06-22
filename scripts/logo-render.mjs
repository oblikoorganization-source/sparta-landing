import { pdf } from "pdf-to-img";
import { promises as fs } from "node:fs";
import sharp from "sharp";

const SRC = "_content/_logo/logo.ai"; // PDF-compatible Illustrator file
const OUT = "_content/_logo";

let i = 0;
const doc = await pdf(SRC, { scale: 5 });
for await (const page of doc) {
  const raw = `${OUT}/render-${i}.png`;
  await fs.writeFile(raw, page);
  const meta = await sharp(page).metadata();
  // trim surrounding uniform background → tight logo
  await sharp(page)
    .trim({ threshold: 12 })
    .toFile(`${OUT}/render-${i}-trim.png`);
  console.log(`page ${i}: ${meta.width}x${meta.height}`);
  i++;
}
console.log("pages:", i);

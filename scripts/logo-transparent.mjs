// Render the SPARTA artboard (pdf page 8) with a TRANSPARENT background.
import { promises as fs } from "node:fs";
import { createCanvas } from "@napi-rs/canvas";
import sharp from "sharp";

const SRC = "_content/_logo/logo.ai";
const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");

const data = new Uint8Array(await fs.readFile(SRC));
const doc = await pdfjs.getDocument({ data, isEvalSupported: false }).promise;
console.log("pages:", doc.numPages);

const PAGE = 8; // artboard index 7 (0-based) => pdfjs page 8 = SPARTA crest
const scale = 7;
const page = await doc.getPage(PAGE);
const vp = page.getViewport({ scale });
const canvas = createCanvas(Math.ceil(vp.width), Math.ceil(vp.height));
const ctx = canvas.getContext("2d");
// do NOT fill background -> stays transparent
await page.render({ canvasContext: ctx, viewport: vp, background: "rgba(0,0,0,0)" }).promise;

const png = canvas.toBuffer("image/png");
await fs.writeFile("_content/_logo/sparta-transparent-raw.png", png);

// trim transparent padding, export web assets
const trimmed = await sharp(png).trim().toBuffer();
const meta = await sharp(trimmed).metadata();
console.log("trimmed:", meta.width + "x" + meta.height, "alpha:", meta.hasAlpha);

await sharp(trimmed).resize({ height: 1000, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile("public/images/logo.png");
await sharp(trimmed).resize({ height: 128 }).png().toFile("public/favicon.png");

// preview on red bg to confirm transparency
await sharp({ create: { width: meta.width + 160, height: meta.height + 160, channels: 4, background: "#e51f26" } })
  .composite([{ input: trimmed, top: 80, left: 80 }])
  .jpeg({ quality: 84 })
  .toFile("_content/_logo/_preview-on-red.jpg");
console.log("done");

// Remove the white artboard background by flood-filling transparency from the
// edges inward. Interior whites (SPARTA text, shield highlights) are enclosed
// by the dark shield, so the edge-flood never reaches them.
import sharp from "sharp";

const SRC = "_content/_logo/sparta-transparent-raw.png";

const { data, info } = await sharp(SRC)
  .resize({ height: 1500 })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const w = info.width;
const h = info.height;
const white = (p) => {
  const i = p * 4;
  return data[i] > 226 && data[i + 1] > 226 && data[i + 2] > 226;
};

const visited = new Uint8Array(w * h);
const stack = new Int32Array(w * h);
let top = 0;
const push = (p) => {
  if (p < 0 || p >= w * h || visited[p]) return;
  visited[p] = 1;
  stack[top++] = p;
};
// seed all border pixels
for (let x = 0; x < w; x++) {
  push(x);
  push((h - 1) * w + x);
}
for (let y = 0; y < h; y++) {
  push(y * w);
  push(y * w + w - 1);
}
while (top > 0) {
  const p = stack[--top];
  if (!white(p)) continue;
  data[p * 4 + 3] = 0; // transparent
  const x = p % w;
  if (x + 1 < w) push(p + 1);
  if (x - 1 >= 0) push(p - 1);
  push(p - w);
  push(p + w);
}

const cut = await sharp(data, { raw: { width: w, height: h, channels: 4 } })
  .png()
  .toBuffer();
const trimmed = await sharp(cut).trim().toBuffer();
const meta = await sharp(trimmed).metadata();
console.log("cut+trim:", meta.width + "x" + meta.height);

await sharp(trimmed).png({ compressionLevel: 9 }).toFile("public/images/logo.png");
await sharp(trimmed).resize({ height: 128 }).png().toFile("public/favicon.png");

await sharp({ create: { width: meta.width + 160, height: meta.height + 160, channels: 4, background: "#e51f26" } })
  .composite([{ input: trimmed, top: 80, left: 80 }])
  .jpeg({ quality: 84 })
  .toFile("_content/_logo/_preview-cut.jpg");
console.log("done");

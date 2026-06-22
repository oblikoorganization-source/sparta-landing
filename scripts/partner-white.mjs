import sharp from "sharp";

// Make clean WHITE logos on TRANSPARENT background (no white box) — uniform height.
// For light-on-dark logos (Grema, Global) the bright pixels are the mark → alpha = mask.
// For the dark-on-white logo (Карпатська) we negate first so the mark becomes the mask.
const ITEMS = [
  { src: "partner-karpatska", invert: true, thr: 150, trim: 18 },
  { src: "partner-grema", invert: false, thr: 130, trim: 60 },
  { src: "partner-global", invert: false, thr: 120, trim: 40 },
];
const LH = 120; // uniform logo height

for (const { src, invert, thr, trim } of ITEMS) {
  // trim flat background, normalise to a uniform height
  const base = await sharp(`public/images/${src}.jpg`)
    .trim({ threshold: trim })
    .resize({ height: LH })
    .toBuffer();
  const { width, height } = await sharp(base).metadata();

  // build alpha mask from luminance
  let g = sharp(base).grayscale();
  if (invert) g = g.negate();
  const mask = await g.threshold(thr).raw().toBuffer(); // 1 channel, 0/255

  // white RGB + mask as alpha
  await sharp({ create: { width, height, channels: 3, background: "#ffffff" } })
    .joinChannel(mask, { raw: { width, height, channels: 1 } })
    .png()
    .toFile(`public/images/${src}-w.png`);
  console.log(`${src}-w.png  ${width}x${height}`);
}
console.log("done");

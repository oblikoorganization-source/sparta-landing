import sharp from "sharp";
import path from "path";
const PUB = path.resolve("public");
const LOGO = path.join(PUB, "images", "logo.png");
const BG = { r: 10, g: 10, b: 12, alpha: 1 }; // brand ink #0a0a0c

async function makeIcon(size, out, padRatio = 0.16) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const logo = await sharp(LOGO)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toFile(path.join(PUB, out));
  console.log("✓", out, `${size}x${size}`);
}

await makeIcon(180, "apple-touch-icon.png");
await makeIcon(192, "icon-192.png");
await makeIcon(512, "icon-512.png");
await makeIcon(48, "favicon.png", 0.12); // square favicon overwrites portrait one
console.log("done");

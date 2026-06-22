import sharp from "sharp";

// Normalize the 3 partner logos to one consistent visual size:
// trim background border → resize to a fixed logo height → center on a uniform white canvas.
const ITEMS = ["partner-karpatska", "partner-grema", "partner-global"];
const CW = 480;   // canvas width
const CH = 200;   // canvas height
const LH = 104;   // uniform logo height
const LWMAX = 380; // cap width so very wide logos don't touch edges

for (const f of ITEMS) {
  // trim the flat background (threshold tolerant to JPG noise)
  let logo = await sharp(`public/images/${f}.jpg`)
    .trim({ threshold: 18 })
    .resize({ height: LH, fit: "inside", withoutEnlargement: false })
    .toBuffer();

  // if still wider than cap, constrain by width instead
  const meta = await sharp(logo).metadata();
  if (meta.width > LWMAX) {
    logo = await sharp(`public/images/${f}.jpg`)
      .trim({ threshold: 18 })
      .resize({ width: LWMAX, fit: "inside" })
      .toBuffer();
  }

  await sharp({
    create: { width: CW, height: CH, channels: 4, background: "#ffffff" },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toFile(`public/images/${f}-n.png`);
  const m2 = await sharp(logo).metadata();
  console.log(`${f}-n.png  logo ${m2.width}x${m2.height}`);
}
console.log("done");

import sharp from "sharp";
const IMAGES = [
  "action-1", "joy-2", "action-2", "team-kids", "action-7", "joy-1",
  "action-4", "highfive", "action-8", "kid-smile", "action-3", "team-girls",
  "action-9", "joy-3", "action-5", "coach-board", "action-10", "huddle",
  "team-adult", "action-11",
];
for (const name of IMAGES) {
  try {
    const m = await sharp(`public/images/${name}.jpg`).metadata();
    const r = m.width / m.height;
    const kind = r > 1.15 ? "land" : r < 0.87 ? "port" : "sq";
    console.log(`${name.padEnd(14)} ${m.width}x${m.height}  r=${r.toFixed(2)}  ${kind}`);
  } catch (e) {
    console.log(`${name}  ERR ${e.message}`);
  }
}

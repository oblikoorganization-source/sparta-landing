// Curate the best shots into public/images with semantic names + gallery thumbnails.
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const WEB = path.resolve("_content/_web");
const OUT = path.resolve("public/images");
const THUMB = path.join(OUT, "thumb");
await fs.mkdir(THUMB, { recursive: true });

// id (from filename) -> semantic name
const MAP = {
  // coach / about
  "9302": "coach-portrait",
  "2422": "coach-board",
  "4239": "coach-ua",
  // achievements
  "8308": "award-lvivsport",
  "2439": "award-lmr",
  "2438": "award-cert",
  "8729": "award-podium",
  "8726": "award-court",
  // teams
  "9322": "team-celebrate", // hero
  "8104": "team-adult",
  "9323": "team-kids",
  "0483": "team-open",
  "4129": "team-ua",
  "7029": "team-trophy",
  "9738": "team-girls",
  // action / gallery
  "9715": "action-1",
  "9325": "action-2",
  "9326": "action-3",
  "9324": "action-4",
  "9305": "action-5",
  "9308": "action-6",
  "9311": "action-7",
  "9313": "action-8",
  "9316": "action-9",
  "9550": "action-10",
  "1240": "action-11",
  "9320": "joy-1",
  "9321": "joy-2",
  "7733": "joy-3",
  "9301": "kid-smile",
  "9318": "huddle",
  "9327": "highfive",
  // inventory / merch
  "531433": "inv-promo",
  "1464": "inv-kit",
  "1462": "inv-jersey",
  "1801": "inv-bag",
  "1604": "inv-tracksuit",
  "1799": "inv-bottle",
  "1465": "inv-backpack",
  "6490": "inv-suits",
  // partners (logos)
  "2453": "partner-grema",
  "2452": "partner-karpatska",
  "1562": "partner-global",
};

const webFiles = await fs.readdir(WEB);

function findWeb(id) {
  // match "..._IMG_9302.jpg" or "531433.jpg"
  return webFiles.find((f) => {
    const m = f.match(/IMG_([0-9]+)\.jpg$/i);
    if (m) return m[1] === id;
    return f === `${id}.jpg`;
  });
}

const report = [];
for (const [id, name] of Object.entries(MAP)) {
  const wf = findWeb(id);
  if (!wf) {
    console.log("MISSING", id, name);
    continue;
  }
  const src = path.join(WEB, wf);
  await sharp(src)
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, `${name}.jpg`));
  await sharp(src)
    .resize({ width: 820, height: 820, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(path.join(THUMB, `${name}.jpg`));
  const meta = await sharp(src).metadata();
  report.push({ name, orient: meta.width >= meta.height ? "land" : "port" });
  console.log("ok", name, `(${id})`);
}

await fs.writeFile(path.join(OUT, "_curated.json"), JSON.stringify(report, null, 2));
console.log("\nCURATED", report.length, "images");

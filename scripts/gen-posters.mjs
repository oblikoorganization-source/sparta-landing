// Generate poster JPEGs (one frame) for every reel in public/video.
// A <video poster=...> with no src renders the poster as a STATIC image and
// uses zero hardware decoders — this is how we kill video lag on phones.
import { readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import ffmpeg from "ffmpeg-static";

const dir = join(process.cwd(), "public", "video");
const reels = readdirSync(dir).filter((f) => f.endsWith(".mp4"));

for (const f of reels) {
  const out = join(dir, f.replace(/\.mp4$/, ".jpg").replace(/^reel-/, "poster-"));
  try {
    execFileSync(
      ffmpeg,
      [
        "-y",
        "-ss", "0.4",
        "-i", join(dir, f),
        "-frames:v", "1",
        // downscale to 640px wide (shown small behind a veil) + decent quality
        "-vf", "scale=640:-2",
        "-q:v", "4",
        out,
      ],
      { stdio: "ignore" }
    );
    console.log("✓", out.split(/[\\/]/).pop());
  } catch (e) {
    console.error("✗", f, e.message);
  }
}
console.log("done:", reels.length, "posters");

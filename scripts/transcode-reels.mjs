// Compress reels to lightweight web clips so 4 can decode at once without lag.
import ffmpegPath from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const SRC = "_content/instagram";
const OUT = "public/video";
await fs.mkdir(OUT, { recursive: true });

const files = (await fs.readdir(SRC)).filter((f) => f.endsWith(".mp4"));
let total = 0;
for (const f of files) {
  const inP = path.join(SRC, f);
  const outP = path.join(OUT, `reel-${f}`);
  execFileSync(
    ffmpegPath,
    [
      "-y",
      "-i", inP,
      "-vf", "scale=-2:640",
      "-c:v", "libx264",
      "-profile:v", "main",
      "-crf", "30",
      "-preset", "veryfast",
      "-pix_fmt", "yuv420p",
      "-an",
      "-movflags", "+faststart",
      outP,
    ],
    { stdio: "ignore" }
  );
  const sz = (await fs.stat(outP)).size / 1024 / 1024;
  total += sz;
  console.log(`reel-${f}  ${sz.toFixed(2)} MB`);
}
console.log(`\nTOTAL ${total.toFixed(1)} MB across ${files.length} clips`);

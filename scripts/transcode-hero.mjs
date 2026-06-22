// Higher-quality versions of the 4 hero-wall reels (they cover full viewport
// height, so they need more vertical resolution to look crisp). Fully preloaded
// by the loader, so playback stays smooth despite the larger size.
import ffmpegPath from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const SRC = "_content/instagram";
const OUT = "public/video";
const HERO = ["DXmdIfcDOwl", "DZHZo0JMPGk", "DXz52EyMsjM", "DXmdM2WjILT"];

for (const id of HERO) {
  const inP = path.join(SRC, `${id}.mp4`);
  const outP = path.join(OUT, `reel-${id}.mp4`);
  execFileSync(
    ffmpegPath,
    [
      "-y", "-i", inP,
      "-vf", "scale=-2:1000",
      "-c:v", "libx264", "-profile:v", "high",
      "-crf", "22", "-preset", "slow",
      "-pix_fmt", "yuv420p", "-an",
      "-movflags", "+faststart",
      outP,
    ],
    { stdio: "ignore" }
  );
  const sz = (await fs.stat(outP)).size / 1024 / 1024;
  console.log(`reel-${id}.mp4  ${sz.toFixed(2)} MB`);
}
console.log("hero reels re-encoded (HQ)");

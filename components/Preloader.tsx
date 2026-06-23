"use client";

import { useEffect, useState } from "react";
import { isAndroid } from "@/lib/device";

// Warm up the heavy hero assets behind the curtain so it plays instantly.
// Android never decodes the hero videos (poster image only) — so there we warm
// only the light images, never the multi-MB reels. iOS/desktop play, so warm all.
const IMAGES = ["/images/team-celebrate.jpg", "/images/action-1.jpg", "/images/logo.png"];
const HERO_VIDS = [
  "/video/reel-DXmdIfcDOwl.mp4",
  "/video/reel-DZHZo0JMPGk.mp4",
  "/video/reel-DXz52EyMsjM.mp4",
  "/video/reel-DXmdM2WjILT.mp4",
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const android = isAndroid();
    // On Android skip the heavy reels entirely (they never play) + shorter curtain.
    const ASSETS = android ? IMAGES : [...HERO_VIDS, ...IMAGES];
    const start = performance.now();
    const MIN = android ? 800 : 1700;
    let loaded = 0;
    let fetchedDone = false;
    let finished = false;
    let display = 0;
    let left = false;
    let raf = 0;

    ASSETS.forEach((u) =>
      fetch(u)
        .then((r) => r.blob())
        .catch(() => {})
        .finally(() => {
          loaded++;
          if (loaded >= ASSETS.length) fetchedDone = true;
        })
    );

    const cap = setTimeout(() => {
      fetchedDone = true;
    }, 8000);

    const leave = () => {
      if (left) return;
      left = true;
      setLeaving(true);
      setTimeout(() => {
        setGone(true);
        document.body.style.overflow = "";
      }, 1300);
    };

    // smooth easing counter — climbs naturally instead of jumping 0→100
    const tick = () => {
      const elapsed = performance.now() - start;
      if (fetchedDone && elapsed >= MIN) finished = true;
      const target = finished ? 100 : Math.min(90, (loaded / ASSETS.length) * 100);
      display += (target - display) * 0.07;
      if (finished && 100 - display < 0.5) display = 100;
      setProgress(Math.round(display));
      if (display >= 100) {
        clearTimeout(cap);
        leave();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(cap);
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`pre${leaving ? " leaving" : ""}`} aria-hidden="true">
      <div className="pre__blinds">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
      <div className="pre__word">SPARTA</div>
      <div className="pre__center">
        <img src="/images/logo.png" className="pre__logo" alt="СПАРТА" />
        <div className="pre__num">
          {progress}
          <span>%</span>
        </div>
        <div className="pre__bar">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="pre__lbl">
          <b>SPARTA</b>
          <span>тренуємо</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { RefObject, useEffect } from "react";
import { isAndroid } from "@/lib/device";

/**
 * Drives a wall of decorative background <video> elements without melting phones.
 *
 * Android phones have only 1–3 hardware video decoders, and `video.pause()` does
 * NOT release them. Playing 4–8 reels at once exhausts the decoders → severe jank.
 * iOS handles the walls fine, so it keeps the videos (just lazier).
 *
 * Strategy:
 *  - On Android (and reduced-motion) we NEVER give the videos a `src` and never
 *    play them. A <video> with a `poster` and no `src` just shows the poster image
 *    — zero decoders, zero jank. (Markup must set poster + data-src, not src.)
 *  - Everywhere else (desktop + iOS) we lazily attach `src` when the video scrolls
 *    in, play it, and on scroll-out we pause AND drop the src to free the decoder.
 */
export function useReelWall(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Android + reduced-motion users keep the static poster only.
    if (isAndroid() || reduce) return;

    const vids = Array.from(el.querySelectorAll<HTMLVideoElement>("video"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) {
            if (!v.src && v.dataset.src) v.src = v.dataset.src;
            v.play().catch(() => {});
          } else {
            v.pause();
            // Release the decoder + memory while off-screen.
            if (v.src) {
              v.removeAttribute("src");
              v.load();
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "200px 0px" }
    );

    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [rootRef]);
}

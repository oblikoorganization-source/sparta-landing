"use client";

import { useEffect, useRef, useState } from "react";
import { useReelWall } from "@/lib/useReelWall";

/* Copy/figures from the client's dialog: «Спарта тренуємо» в кожному відео,
   мільйони переглядів щомісяця в TikTok та Instagram. */

const REELS = [
  "DZHZ0zSMr1k", "DYUkAJnDSfo", "DXmdIfcDOwl", "DYdA2LPmp_1", "DZHZo0JMPGk", "DXKuntNDHVE",
];

const STATS = [
  { v: "1,5 млн", l: "переглядів / місяць · TikTok" },
  { v: "1 млн", l: "переглядів / місяць · Instagram" },
  { v: "10K", l: "підписників за 3 місяці" },
];

const IG = "https://www.instagram.com/flc_sparta";
const TT = "https://www.tiktok.com/@flc.sparta";

export default function MediaSection() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  // auto-cycle the highlighted stat card
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % STATS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  // Lazy-load + play on desktop; on phones the poster image shows (no decoders).
  useReelWall(root);

  return (
    <section className="block block--ink iv-sec iv-sec--full media-sec media-sec--bg" id="media" ref={root}>
      <div className="mvidbg" aria-hidden="true">
        {REELS.map((id) => (
          <video
            key={id}
            data-src={`/video/reel-${id}.mp4`}
            poster={`/video/poster-${id}.jpg`}
            muted
            loop
            playsInline
            preload="none"
          />
        ))}
      </div>
      <div className="mvidbg__veil" aria-hidden="true" />

      <div className="wrap mwrap mv3 mv3--bg mv3--center">
        <header className="mhead mhead--center">
          <div className="ck">
            <span className="ck__num">06</span>
            <span className="ck__lbl ck__lbl--4">Медіа</span>
          </div>
          <h2 className="display mhead__title">
            Нас бачить <span className="red">вся країна</span>
          </h2>
          <p className="lead mhead__lead mhead__quote">
            <span className="red">«SPARTA тренуємо»</span> — фраза з кожного відео.
            Мільйони переглядів щомісяця в TikTok та Instagram популяризують
            флорбол на всю країну.
          </p>
        </header>

        <div
          className="mbignums sv--3"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          {STATS.map((st, i) => (
            <div className={`mbignum${active === i ? " is-active" : ""}`} key={st.l}>
              <span className="mbignum__n">{st.v}</span>
              <span className="mbignum__l">{st.l}</span>
            </div>
          ))}
        </div>

        <div className="msocials">
          <a href={IG} target="_blank" rel="noopener" className="btn btn--solid">
            <span>Instagram</span> <span className="arr">→</span>
          </a>
          <a href={TT} target="_blank" rel="noopener" className="btn btn--line">
            <span>TikTok</span> <span className="arr">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

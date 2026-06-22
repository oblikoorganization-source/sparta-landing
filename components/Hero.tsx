"use client";

import { useEffect, useRef } from "react";

// Hero reels (chosen by content). The wall of muted looping videos behind the
// typographic poster.
const HERO_REELS = ["DXmdIfcDOwl", "DZHZo0JMPGk", "DXz52EyMsjM", "DXmdM2WjILT"];

export default function Hero() {
  const wrap = useRef<HTMLDivElement>(null);

  // Pause hero videos when scrolled out of view — frees CPU/GPU for the rest.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const vids = Array.from(el.querySelectorAll("video"));
    const io = new IntersectionObserver(
      ([e]) => {
        vids.forEach((v) => {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap}>
      <section className="hero">
        <div className="hero__reelwall" aria-hidden="true">
          {HERO_REELS.map((id) => (
            <video
              key={id}
              src={`/video/reel-${id}.mp4`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ))}
        </div>
        <div className="hero__veil" />
        <div className="hero__in">
          <p className="hero__eyebrow eyebrow">
            <span className="hero__dot" />
            Флорбольний клуб · Львів, Сихів · з 2010
          </p>
          <h1 className="display">
            <span className="l1">SPARTA</span>
            <span className="l2">ТРЕНУЄМО</span>
          </h1>
          <p className="hero__lead lead">
            Флорбол для дітей і дорослих — від 4 до 50 років. І найбільший в
            Україні вибір інвентарю для флорболу.
          </p>
          <div className="hero__actions">
            <a href="#contacts" className="btn btn--solid">
              <span>Записатися на тренування</span> <span className="arr">→</span>
            </a>
            <a href="#inventory" className="btn btn--line">
              <span>Інвентар для флорболу</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

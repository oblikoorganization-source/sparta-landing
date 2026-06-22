"use client";

import { useEffect, useRef } from "react";

// dynamic gameplay clips, all different from the hero
const VID_REELS = ["DYNec_yM9x2", "DYNej2iMn96", "DXz5QLvsxgs", "DZHZ0zSMr1k"];

// verified from the client's autobiography (dialog-full.md) — real titles
const ACH = [
  { y: "2024", t: "Чемпіони України · сезон 2023/24" },
  { y: "2025", t: "100 кращих дитячих тренерів року" },
  { y: "2024", t: "100 кращих дитячих тренерів року" },
  { y: "2023", t: "Бронза Lemberg Christmas Challenge" },
  { y: "2022", t: "Переможець Alliance Autumn Cup" },
  { y: "19–23", t: "Тренер жіночої збірної України" },
  { y: "2020", t: "100 кращих дитячих тренерів року" },
  { y: "2016", t: "Срібло «Ukraine Open» · бронза «Кубку Янтаря»" },
];

export default function AchievementsSection() {
  const root = useRef<HTMLElement>(null);

  // play bg videos only while the section is on screen
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const vids = Array.from(el.querySelectorAll("video"));
    const io = new IntersectionObserver(([e]) => {
      vids.forEach((vd) => (e.isIntersecting ? vd.play().catch(() => {}) : vd.pause()));
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="palmares" className="block block--ink pal-sec" ref={root}>
      <div className="av-vidbg" aria-hidden="true">
        <div className="av-vidbg__grid">
          {VID_REELS.map((id) => (
            <video key={id} src={`/video/reel-${id}.mp4`} autoPlay muted loop playsInline preload="auto" />
          ))}
        </div>
      </div>
      <div className="av-veil" style={{ opacity: 0.7 }} aria-hidden="true" />

      <div className="wrap">
        <div className="av av--1 hov--0">
          <div className="av-list">
            {ACH.map((a, i) => (
              <div className="av-row" key={i}>
                <span className="av-y">{a.y}</span>
                <span className="av-t">{a.t}</span>
              </div>
            ))}
          </div>
          <div className="av-head">
            <div className="ck">
              <span className="ck__num">03</span>
              <span className="ck__lbl ck__lbl--4">Досягнення</span>
            </div>
            <h2 className="display display--l stats2__title" style={{ marginTop: 16 }}>
              <span style={{ color: "transparent", WebkitTextStroke: "2px #f3efe6" }}>
                Послужний
              </span>{" "}
              <span className="red">список</span>
            </h2>
            <p className="lead" style={{ marginTop: 16 }}>
              Доведено на майданчику й визнано офіційно — від нагород міста до
              тренерського штабу збірної України.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

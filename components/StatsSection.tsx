"use client";

import { useEffect, useRef, useState } from "react";

// figures verified from the client's autobiography / voice notes — not invented
const STATS = [
  { n: "16", lbl: "років у флорболі", cap: "У спорті з 2010 року", count: "16" },
  { n: "10", lbl: "років тренуємо", cap: "Власний клуб і доросла команда", count: "10" },
  { n: "4–50", lbl: "вік гравців", cap: "Від малюків до дорослої команди" },
  { n: "3", suf: "×", lbl: "кращий тренер", cap: "Відзнака Львівської міськради · 2020 · 2024 · 2025", count: "3" },
];

export default function StatsSection() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(-1);
      return;
    }
    const id = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % STATS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="stats" className="block block--ink stats-full">
      <div className="stbg stbg--3" aria-hidden="true" />
      <div className="wrap stats2">
        <div className="stats2__left">
          <div className="ck">
            <span className="ck__num">02</span>
            <span className="ck__lbl ck__lbl--4">Чому SPARTA</span>
          </div>
          <h2 className="display display--l stats2__title" style={{ marginTop: 20 }}>
            Досвід у <span className="red">цифрах</span>
          </h2>
          <p className="lead stats2__lead" style={{ marginTop: 22 }}>
            16 років у спорті, власний клуб і діти — <b>чемпіони України</b>.
            Цифри, а не обіцянки.
          </p>
        </div>

        <div
          className="stx2 stx2--0"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          {STATS.map((s, i) => (
            <div className={`st${active === i ? " is-active" : ""}`} key={i}>
              <div className="st__num">
                {s.count ? <span data-count={s.count}>{s.n}</span> : s.n}
                {s.suf || ""}
              </div>
              <div className="st__txt">
                <div className="st__lbl">{s.lbl}</div>
                <div className="st__cap">{s.cap}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

const IMAGES = [
  "action-1", "joy-2", "action-2", "team-kids", "action-7", "joy-1",
  "action-4", "highfive", "action-8", "kid-smile", "action-3", "team-girls",
  "action-9", "joy-3", "action-5", "coach-board", "action-10", "huddle",
  "team-adult", "action-11",
];

// descriptive, keyword-rich alt per photo (image SEO + a11y) — no duplicates
const ALT: Record<string, string> = {
  "action-1": "Гравець ФК «Спарта» веде мʼяч під час матчу з флорболу, Львів",
  "action-2": "Атака команди «Спарта» у грі з флорболу",
  "action-3": "Боротьба за мʼяч на флорбольному матчі ФК «Спарта»",
  "action-4": "Кидок по воротах на змаганнях із флорболу «Спарта»",
  "action-5": "Флорболіст «Спарти» в ігровому епізоді",
  "action-7": "Командна гра ФК «Спарта» на турнірі з флорболу",
  "action-8": "Гравці «Спарти» в атаці на флорбольному майданчику",
  "action-9": "Динамічний момент матчу з флорболу ФК «Спарта»",
  "action-10": "Воротар «Спарти» рятує ворота у флорболі",
  "action-11": "Ігровий момент турніру з флорболу «Спарта», Львів",
  "joy-1": "Юні флорболісти «Спарти» радіють перемозі",
  "joy-2": "Команда ФК «Спарта» святкує гол",
  "joy-3": "Емоції перемоги на турнірі з флорболу «Спарта»",
  "team-kids": "Дитяча команда ФК «Спарта» з флорболу, Львів",
  "team-girls": "Жіноча команда «Спарти» з флорболу",
  "team-adult": "Доросла команда ФК «Спарта» з флорболу",
  "highfive": "Гравці «Спарти» вітають одне одного на тренуванні з флорболу",
  "kid-smile": "Юний флорболіст ФК «Спарта» на тренуванні у Львові",
  "coach-board": "Тренер Данило Ревега пояснює тактику флорболу команді «Спарта»",
  "huddle": "Команда ФК «Спарта» налаштовується перед матчем із флорболу",
};

const slides = IMAGES.map((s) => ({ src: `/images/${s}.jpg`, alt: ALT[s] }));

// real proportions of every photo → mosaic tiles match them = no crop
const DIMS: Record<string, [number, number]> = {
  "action-1": [1200, 1600], "joy-2": [1066, 1600], "action-2": [1066, 1600],
  "team-kids": [1600, 1066], "action-7": [1600, 1066], "joy-1": [1066, 1600],
  "action-4": [1066, 1600], "highfive": [1066, 1600], "action-8": [1600, 1066],
  "kid-smile": [1066, 1600], "action-3": [1066, 1600], "team-girls": [1200, 1600],
  "action-9": [1066, 1600], "joy-3": [1600, 1067], "action-5": [1066, 1600],
  "coach-board": [1600, 1067], "action-10": [1067, 1600], "huddle": [1066, 1600],
  "team-adult": [1600, 1200], "action-11": [1600, 1060],
};

export default function GallerySection() {
  const [open, setOpen] = useState(-1);
  const [cols, setCols] = useState(4);

  useEffect(() => {
    const calc = () =>
      setCols(window.innerWidth <= 600 ? 2 : window.innerWidth <= 1000 ? 3 : 4);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // balanced masonry distribution — fill the shortest column each step
  const columns: { src: string; i: number }[][] = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);
  IMAGES.forEach((src, i) => {
    const [w, h] = DIMS[src];
    const c = heights.indexOf(Math.min(...heights));
    columns[c].push({ src, i });
    heights[c] += h / w;
  });

  return (
    <section className="block block--ink gal-sec" id="gallery">
      <div className="stbg stbg--3" aria-hidden="true" />

      <div className="wrap gal-wrap">
        <header className="gal-head">
          <div className="ck">
            <span className="ck__num">07</span>
            <span className="ck__lbl ck__lbl--4">Галерея</span>
          </div>
          <h2 className="display iv4-title iv4-title--one gal-title">
            <span style={{ color: "transparent", WebkitTextStroke: "2px #f3efe6" }}>
              Більше, ніж
            </span>{" "}
            <span className="red">гра</span>
          </h2>
          <p className="lead gal-lead">
            Турніри, перемоги, друзі та характер — ось чим живе «SPARTA» щодня.
            Гортай кадри й переконайся сам.
          </p>
        </header>

        <div className="gmas">
          {columns.map((col, ci) => (
            <div className="gmas__col" key={ci}>
              {col.map(({ src, i }) => (
                <figure
                  className="galx__item"
                  key={src}
                  style={{ aspectRatio: `${DIMS[src][0]} / ${DIMS[src][1]}` }}
                  onClick={() => setOpen(i)}
                >
                  <img src={`/images/thumb/${src}.jpg`} alt={ALT[src] ?? "ФК «Спарта» — флорбол"} loading="lazy" />
                  <span className="galx__zoom" aria-hidden="true">+</span>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={open >= 0}
        index={open < 0 ? 0 : open}
        close={() => setOpen(-1)}
        slides={slides}
        plugins={[Zoom, Thumbnails, Counter, Fullscreen]}
        carousel={{ finite: false }}
        counter={{ container: { style: { top: "16px", bottom: "unset", left: "16px" } } }}
        thumbnails={{ width: 84, height: 116, border: 0, gap: 8, padding: 0 }}
        zoom={{ maxZoomPixelRatio: 3 }}
        styles={{ container: { backgroundColor: "rgba(6,6,8,0.96)" } }}
      />
    </section>
  );
}

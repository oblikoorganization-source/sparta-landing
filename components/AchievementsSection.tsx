"use client";

import { useRef } from "react";
import { useReelWall } from "@/lib/useReelWall";

// dynamic gameplay clips, all different from the hero
const VID_REELS = ["DYNec_yM9x2", "DYNej2iMn96", "DXz5QLvsxgs", "DZHZ0zSMr1k"];

// one chronological list — player + coach + kids' titles (verified: voice 24.06 / dialog-full.md)
// tag "вихованці" = won by his school/kids (keeps the personal/school distinction lightweight)
const ACH: { y: string; t: string; tag?: string }[] = [
  { y: "10/11", t: "Переможець Західноукраїнської ліги" },
  { y: "2017", t: "Переможець «Hrubieszów Cup» · Польща" },
  { y: "17/18", t: "Чемпіон України · U16" },
  { y: "2018", t: "Дебют за збірну України U19" },
  { y: "2019", t: "Капітан збірної України U19" },
  { y: "18/19", t: "Чемпіон України · Вища Ліга" },
  { y: "19/20", t: "Чемпіон України · Вища Ліга" },
  { y: "2022", t: "Переможець Alliance Autumn Cup · U-15", tag: "вихованці" },
  { y: "2023", t: "Бронза Lemberg Christmas Challenge", tag: "вихованці" },
  { y: "19–23", t: "Тренер жіночої збірної України" },
  { y: "23/24", t: "Чемпіони України · U14", tag: "вихованці" },
];

export default function AchievementsSection() {
  const root = useRef<HTMLElement>(null);

  // Lazy-load + play on desktop; on phones the poster image shows (no decoders).
  useReelWall(root);

  return (
    <section id="palmares" className="block block--ink pal-sec" ref={root}>
      <div className="av-vidbg" aria-hidden="true">
        <div className="av-vidbg__grid">
          {VID_REELS.map((id) => (
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
      </div>
      <div className="av-veil" style={{ opacity: 0.7 }} aria-hidden="true" />

      <div className="wrap">
        <div className="av av--split">
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
            <p className="lead" style={{ marginTop: 12 }}>
              Доведено на майданчику й визнано офіційно — від власної кар'єри
              гравця та тренера до титулів наших вихованців.
            </p>
          </div>

          <div className="av-list av-list--one hov--0">
            {ACH.map((a, i) => (
              <div className="av-row" key={i}>
                <span className="av-y">{a.y}</span>
                <span className="av-t">
                  {a.t}
                  {a.tag && <span className="av-tag">{a.tag}</span>}
                </span>
              </div>
            ))}
          </div>

          <div className="av-award">
            <span className="av-award__big">3×</span>
            <div className="av-award__body">
              <span className="av-award__t">«100 кращих тренерів року»</span>
              <span className="av-award__sub">
                за версією Львівської міської ради · зі всіх видів спорту
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

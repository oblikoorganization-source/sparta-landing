"use client";

import { Fragment, useEffect, useState } from "react";

// All grounded in the client's dialog (dialog-full.md:111):
// Карпатська джерельна — напої/соки/снеки, дають продукцію клубу;
// Грема — нержавійка + холодильне обладнання, фінансова підтримка (хресний Данила);
// Global Auto Logistic — імпорт авто зі США, купують форму/інвентар, оплачують поїздки дітям.
type Partner = {
  src: string;
  name: string;
  role: string;
  desc: string;
  give: string;
  lg?: boolean;
  promo?: boolean;
  url?: string;
};

const PARTNERS: Partner[] = [
  {
    src: "partner-karpatska-c",
    name: "Карпатська джерельна",
    role: "Напій команди",
    desc: "Гідратація для чемпіонів — забезпечують клуб напоями та снеками для зйомок і розіграшів.",
    give: "Продукція для команди",
    lg: true,
  },
  {
    src: "partner-grema-c",
    name: "Grema",
    role: "Партнер-інвестор",
    desc: "Виробник рішень із нержавіючої сталі та холодильного обладнання. Активно інвестують у клуб.",
    give: "Фінансова підтримка",
    lg: true,
  },
  {
    src: "partner-global-c",
    name: "Global Auto Logistic",
    role: "Топ-імпортер зі США",
    desc: "Привозять авто зі США під ключ. Споряджають клуб формою, інвентарем і поїздками для дітей.",
    give: "Форма · інвентар · поїздки",
    promo: true,
    url: "https://gal.in.ua/",
  },
];

// promo details (умови — на підтвердженні клієнта)
const PROMO = {
  code: "SPARTA",
  benefit: "−200 $",
  url: "https://gal.in.ua/",
};

export default function PartnersSection() {
  const [promoOpen, setPromoOpen] = useState(false);

  // lock scroll + close on Esc while the modal is open
  useEffect(() => {
    if (!promoOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPromoOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [promoOpen]);

  return (
    <section className="block block--ink partners-sec" id="partners">
      <div className="stbg stbg--3" aria-hidden="true" />

      <div className="wrap pt-wrap pt--center">
        <div className="ck">
          <span className="ck__num">09</span>
          <span className="ck__lbl ck__lbl--4">Партнери</span>
        </div>

        <h2 className="display iv4-title iv4-title--one pt-title">
          <span style={{ color: "transparent", WebkitTextStroke: "2px #f3efe6" }}>
            Нас
          </span>{" "}
          <span className="red">підтримують</span>
        </h2>

        <p className="lead pt-lead">
          «SPARTA» підтримують надійні українські бренди. Вони інвестують у
          команду, інвентар і майбутнє наших дітей — і ми пишаємось цим
          партнерством.
        </p>

        <div className="pv4">
          {PARTNERS.map((p, i) => {
            const inner = (
              <>
                <span className={`pcard4__logo${p.lg ? " pcard4__logo--lg" : ""}`}>
                  <img src={`/images/${p.src}.png`} alt={p.name} loading="lazy" />
                </span>
                <div className="pcard4__body">
                  <span className="pcard4__role">{p.role}</span>
                  <p className="pcard4__desc">{p.desc}</p>
                  <span className="pcard4__give">
                    <i aria-hidden="true" />
                    {p.give}
                  </span>
                </div>
              </>
            );
            // whole card links to the partner's site when a url is set
            const card = p.url ? (
              <a
                className="pcard4"
                href={p.url}
                target="_blank"
                rel="noopener"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {inner}
              </a>
            ) : (
              <article className="pcard4" style={{ animationDelay: `${i * 0.1}s` }}>
                {inner}
              </article>
            );
            if (!p.promo) return <Fragment key={p.src}>{card}</Fragment>;
            // promo card stays identical to the others (overflow:hidden) — the
            // badge lives on the wrapping cell so it can stick out cleanly
            return (
              <div className="pcard4-cell" key={p.src}>
                {card}
                <button
                  type="button"
                  className="promo-badge"
                  onClick={() => setPromoOpen(true)}
                  aria-label="Промокод від SPARTA"
                >
                  <span className="promo-badge__spark" aria-hidden="true" />
                  <span className="promo-badge__txt">
                    Промокод <b>{PROMO.benefit}</b>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {promoOpen && (
        <div
          className="promo-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-title"
          onClick={() => setPromoOpen(false)}
        >
          <div className="promo-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="promo-card__x"
              onClick={() => setPromoOpen(false)}
              aria-label="Закрити"
            >
              ×
            </button>

            <span className="promo-card__kick">Промокод від SPARTA</span>

            <div className="promo-card__deal">
              <span className="promo-card__benefit">{PROMO.benefit}</span>
              <span className="promo-card__on">
                на будь-яке авто <span className="red">зі США</span>
              </span>
            </div>

            <p className="promo-card__desc">
              Купуй авто через <b>Global Auto Logistic</b> — у наявності або під
              замовлення — і назви промокод нижче. Він дає <b>−200 $</b> знижки
              завдяки партнерству зі «SPARTA».
            </p>

            <div className="promo-card__code" aria-label="Промокод">
              <span className="promo-card__code-lbl">Промокод</span>
              <span className="promo-card__code-val">{PROMO.code}</span>
            </div>

            <a
              href={PROMO.url}
              target="_blank"
              rel="noopener"
              className="btn btn--solid promo-card__btn"
              onClick={() => setPromoOpen(false)}
            >
              <span>Отримати знижку</span> <span className="arr">→</span>
            </a>

            <span className="promo-card__note">
              Переходиш на сайт Global Auto Logistic
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

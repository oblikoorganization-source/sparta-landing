"use client";

// grounded in client's voice note (dialog-full.md:354) + Czechia case (dialog-full.md:117)
const INCLUDED = [
  { n: "01", t: "Тренування", d: "Щодня з тренером клубу" },
  { n: "02", t: "Басейн", d: "Відновлення після навантажень" },
  { n: "03", t: "Спа", d: "Перезавантаження для команди" },
  { n: "04", t: "Харчування", d: "Повний пансіон" },
  { n: "05", t: "Проживання", d: "Комфортна база · 5 ночей" },
];

export default function CampSection() {
  return (
    <section className="block block--ink camp-sec" id="camp">
      <div className="stbg stbg--3" aria-hidden="true" />

      <div className="wrap camp-wrap cv--center">
        <div className="ck">
          <span className="ck__num">08</span>
          <span className="ck__lbl ck__lbl--4">Табір</span>
        </div>

        <h2 className="display iv4-title iv4-title--one camp-title">
          <span style={{ color: "transparent", WebkitTextStroke: "2px #f3efe6" }}>
            Літній
          </span>{" "}
          <span className="red">табір</span>
        </h2>

        <p className="lead camp-lead">
          Серпень · 6 днів · 5 ночей. Все включено — від ранкових тренувань до
          басейну, спа та повного пансіону.
        </p>

        <div className="cw cw--2">
          {INCLUDED.map((i, idx) => (
            <div className="cw2" key={i.n} style={{ animationDelay: `${idx * 0.08}s` }}>
              <span className="cw2__n">{i.n}</span>
              <span className="cw2__line" aria-hidden="true" />
              <span className="cw2__t">{i.t}</span>
              <span className="cw2__d">{i.d}</span>
            </div>
          ))}
        </div>

        <blockquote className="camp-quote">
          <span className="camp-quote__kick">Наш досвід</span>
          <span className="camp-quote__txt">
            «Ми вже возили дітей на тренувальний табір до Чехії — 7 днів і матчі
            проти <span className="red">збірної Чехії</span>. Такий досвід
            лишається з ними на все життя.»
          </span>
          <cite className="camp-quote__by">— Данило Ревега, тренер</cite>
        </blockquote>

        <a href="#contacts" className="btn btn--solid camp-cta">
          <span>Забронювати місце</span> <span className="arr">→</span>
        </a>
      </div>
    </section>
  );
}

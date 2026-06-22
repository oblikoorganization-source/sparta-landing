"use client";

// All grounded in the client's dialog (dialog-full.md:111):
// Карпатська джерельна — напої/соки/снеки, дають продукцію клубу;
// Грема — нержавійка + холодильне обладнання, фінансова підтримка (хресний Данила);
// Global Auto Logistic — імпорт авто зі США, купують форму/інвентар, оплачують поїздки дітям.
const PARTNERS = [
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
  },
];

export default function PartnersSection() {
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
          {PARTNERS.map((p, i) => (
            <article className="pcard4" key={p.src} style={{ animationDelay: `${i * 0.1}s` }}>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

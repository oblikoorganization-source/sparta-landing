// addresses from the client's voice notes (to be re-checked by client)
const LOCS = [
  { n: "01", name: "Школа №13", addr: "вул. Драгана, 7 · Сихів", age: "2 групи · діти" },
  { n: "02", name: "Школа «Дивосвіт»", addr: "вул. Кирила Терлецького, 12 · Сихів", age: "1–4 класи" },
  { n: "03", name: "Зал «Мандаринка»", addr: "при школі №95 · Сихів", age: "Доросла · 16–50" },
  { n: "04", name: "Kingdom School", addr: "приватна школа · Львів", age: "Новий набір" },
];

export default function LocationsSection() {
  return (
    <section id="locations" className="block block--ink loc-sec">
      <div className="stbg stbg--3" aria-hidden="true" />
      <div className="wrap loc-wrap lv--1">
        <div className="loc-head">
          <div className="ck">
            <span className="ck__num">04</span>
            <span className="ck__lbl ck__lbl--4">Локації</span>
          </div>
          <h2 className="display display--l stats2__title" style={{ marginTop: 16 }}>
            Де ми <span className="red">тренуємо</span>
          </h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Чотири майданчики на Сихові — від 4 до 50 років. Залиште заявку —
            підкажемо найближчу локацію, розклад і вільні місця.
          </p>
          <a href="#contacts" className="btn btn--solid" style={{ marginTop: 24 }}>
            <span>Залишити заявку</span> <span className="arr">→</span>
          </a>
          <div className="loc-chips">
            <span>4 локації</span>
            <span>Вік 4–50</span>
            <span>Сихів · Львів</span>
          </div>
        </div>

        <div className="lx lx--2 loc-cards">
          {LOCS.map((l) => (
            <div className="lx-card" key={l.n}>
              <span className="lx-no">{l.n}</span>
              <h3 className="lx-name">{l.name}</h3>
              <p className="lx-addr">{l.addr}</p>
              <span className="lx-age">{l.age}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

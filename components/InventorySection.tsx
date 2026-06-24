/* All copy verified from the client's dialog (dialog-full.md):
   "найбільший продавець флорбольного інвентарю в Україні",
   "від кросівок до клюшки", клюшка від 1450 грн, категорії
   "клюшки, м'ячі, ворота, захист", знижки тренерам, TG-канал. */

const CATS = [
  { name: "Клюшки", tag: "1 450 – 9 000+ грн", desc: "Від першої до профі. Під хват, ріст і стиль." },
  { name: "М'ячі", tag: "Сертифіковані", desc: "Для тренувань і офіційних матчів." },
  { name: "Взуття", tag: "Для залу", desc: "Правильне зчеплення, підбір під стопу." },
  { name: "Ворота · пасери", tag: "Тренерам", desc: "Пасери на пружинах, ворота, обладнання." },
  { name: "Захист", tag: "Воротарське", desc: "Екіпіровка воротарів і польових." },
  { name: "Аксесуари", tag: "Дрібниці", desc: "Пов'язки, окуляри, сумки, пляшки." },
];

const PTS = ["Знижки тренерам", "Доставка по всій Україні", "Замовлення від А до Я"];
const TG = "https://t.me/flcsparta";

export default function InventorySection() {
  return (
    <section className="block block--ink iv-sec iv-sec--full" id="inventory">
      <div className="iv-wrap iv--4">
        <header className="iv4-head">
          <div className="iv4-top">
            <div className="ck">
              <span className="ck__num">05</span>
              <span className="ck__lbl ck__lbl--4">Інвентар</span>
            </div>
            <span className="iv-badge">Від кросівок до клюшки</span>
          </div>
          <h2 className="display iv4-title iv4-title--one">
            <span style={{ color: "transparent", WebkitTextStroke: "2px #f3efe6" }}>
              Найбільший вибір
            </span>{" "}
            <span className="red">в Україні</span>
          </h2>
          <p className="sr-only">
            Купити клюшки для флорболу в Україні. «Спарта» — найбільший вибір
            флорбольного інвентарю та спорядження: клюшки для флорболу від 1450
            грн, мʼячі, взуття для залу, ворота, пасери, воротарський і польовий
            захист, аксесуари. Доставка по всій Україні. Підбір від гравця
            збірної та тренера, знижки тренерам і на оптові замовлення.
          </p>
        </header>

        <div className="ivl4">
          <div className="ivl4__list">
            {CATS.map((c, i) => (
              <div className="ivl4cat" key={c.name}>
                <span className="ivl4cat__no">{String(i + 1).padStart(2, "0")}</span>
                <div className="ivl4cat__body">
                  <span className="ivl4cat__name">{c.name}</span>
                  <span className="ivl4cat__desc">{c.desc}</span>
                </div>
                <span className="ivl4cat__tag">{c.tag}</span>
              </div>
            ))}
          </div>

          <div className="ivl4__right">
            <blockquote className="iv4-quote ivl4__quote">
              «Підбираю не як продавець — <span className="red">а як тренер</span>»
            </blockquote>
            <aside className="ivl4cta ivl4cta--b">
              <h3>
                Зберемо твою <span className="red">екіпіровку</span>
              </h3>
              <ul className="ivl4cta__pts">
                {PTS.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="ivl4cta__btns">
                <a href={TG} target="_blank" rel="noopener" className="btn btn--solid">
                  <span>Каталог у Telegram</span> <span className="arr">→</span>
                </a>
                <a href={TG} target="_blank" rel="noopener" className="btn btn--line">
                  <span>Запитати наявність</span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

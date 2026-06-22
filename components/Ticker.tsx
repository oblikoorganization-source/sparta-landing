const WORDS = [
  "SPARTA тренуємо",
  "Флорбол · Львів",
  "Виховуємо характер",
  "Інвентар по всій Україні",
  "Команда · дисципліна · перемога",
];

export default function Ticker() {
  const row = Array.from({ length: 2 }).flatMap((_, k) =>
    WORDS.map((t, i) => (
      <span key={`${k}-${i}`}>
        {t}
        <img className="tk__logo" src="/images/logo.png" alt="" />
      </span>
    ))
  );

  return (
    <div className="ticker tk--1" aria-hidden="true">
      <div className="ticker__row">{row}</div>
    </div>
  );
}

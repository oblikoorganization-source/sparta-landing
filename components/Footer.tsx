export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="wrap foot__row">
        <img src="/images/logo.png" alt="ФК Спарта" className="foot__logo" />
        <span className="foot__copy">© {year} ФК «SPARTA» · Львів</span>
        <span className="foot__meta">
          <span>Флорбол</span>
          <i aria-hidden="true">·</i>
          <span>тренування</span>
          <i aria-hidden="true">·</i>
          <span>інвентар</span>
        </span>
      </div>
    </footer>
  );
}

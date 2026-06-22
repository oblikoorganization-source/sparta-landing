"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#club", label: "Клуб" },
  { href: "#palmares", label: "Досягнення" },
  { href: "#locations", label: "Локації" },
  { href: "#inventory", label: "Інвентар" },
  { href: "#media", label: "Медіа" },
  { href: "#contacts", label: "Контакти" },
];

const SOC = [
  { href: "https://t.me/flcsparta", label: "Telegram", icon: "tg" },
  { href: "https://www.instagram.com/flc_sparta", label: "Instagram", icon: "ig" },
  { href: "https://www.tiktok.com/@flc.sparta", label: "TikTok", icon: "tt" },
];

function NIcon({ name }: { name: string }) {
  if (name === "tg")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.9 4.3 2.9 11.6c-1.1.4-1.1 1.9 0 2.3l4.7 1.5 1.8 5.6c.2.6 1 .8 1.4.3l2.6-2.8 4.7 3.5c.5.4 1.2.1 1.4-.5l3.5-15.6c.2-.8-.6-1.4-1.3-1.1Zm-3.6 3.3-8 7.1c-.1.1-.2.2-.2.4l-.3 2.7c0 .1-.2.1-.2 0l-1.4-4.3c0-.2 0-.3.2-.4l9.6-5.8c.3-.1.5.2.3.4Z" />
      </svg>
    );
  if (name === "ig")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5.2" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 3c.3 2.3 1.6 3.7 3.9 3.9v2.7c-1.3.1-2.5-.2-3.9-1v6.1c0 4-3.3 6.8-7 6.1-3-.6-4.8-3.6-4.2-6.6.5-2.6 3-4.4 5.8-4.1v2.8c-.5-.1-1-.2-1.5-.1-1.3.2-2.2 1.2-2 2.6.1 1.3 1.3 2.2 2.7 2 1.2-.2 2-1.2 2-2.5V3h4.2Z" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`hdr${scrolled ? " scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="hdr__in">
        <a href="#top" className="brand" onClick={close}>
          <img src="/images/logo.png" alt="" className="brand__logo" />
          <span className="brand__txt">SPAR<b>TA</b></span>
        </a>

        <nav className={`nav${open ? " open" : ""}`}>
          <a href="#top" className="nav__brand" onClick={close}>
            <img src="/images/logo.png" alt="ФК Спарта" />
            <span>SPAR<b>TA</b></span>
          </a>

          <ul className="nav__list">
            {LINKS.map((l, i) => (
              <li key={l.href}>
                <a href={l.href} className="nav__link" onClick={close}>
                  <span className="nav__i">{String(i + 1).padStart(2, "0")}</span>
                  <span className="nav__t" data-t={l.label}>{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="nav__foot">
            <a href="#contacts" className="btn btn--solid nav__cta" onClick={close}>
              <span>Записатися</span> <span className="arr">→</span>
            </a>
            <div className="nav__soc">
              {SOC.map((s) => (
                <a key={s.icon} href={s.href} target="_blank" rel="noopener" aria-label={s.label}>
                  <NIcon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </nav>

        <a href="#contacts" className="btn btn--solid hdr__cta" onClick={close}>
          <span>Записатися</span>
        </a>

        <button
          className={`burger${open ? " x" : ""}`}
          aria-label="Меню"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

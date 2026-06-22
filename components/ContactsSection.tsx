"use client";

import ContactForm from "@/components/ContactForm";

const MAPS = "https://www.google.com/maps/search/?api=1&query=Drahana%207%2C%20Lviv%2C%20Ukraine";

const SOCIALS = [
  { k: "Telegram", v: "t.me/flcsparta", href: "https://t.me/flcsparta", icon: "tg" },
  { k: "Instagram", v: "@flc_sparta", href: "https://www.instagram.com/flc_sparta", icon: "ig" },
  { k: "TikTok", v: "@flc.sparta", href: "https://www.tiktok.com/@flc.sparta", icon: "tt" },
];

function Icon({ name }: { name: string }) {
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
  if (name === "tt")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.6 3c.3 2.3 1.6 3.7 3.9 3.9v2.7c-1.3.1-2.5-.2-3.9-1v6.1c0 4-3.3 6.8-7 6.1-3-.6-4.8-3.6-4.2-6.6.5-2.6 3-4.4 5.8-4.1v2.8c-.5-.1-1-.2-1.5-.1-1.3.2-2.2 1.2-2 2.6.1 1.3 1.3 2.2 2.7 2 1.2-.2 2-1.2 2-2.5V3h4.2Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export default function ContactsSection() {
  return (
    <section className="block block--ink contacts-sec fxt fxt--3" id="contacts">
      <div className="wrap ct-wrap ct-split">
        <div className="ct-intro">
          <div className="ck">
            <span className="ck__num">10</span>
            <span className="ck__lbl ck__lbl--4">Контакти</span>
          </div>

          <h2 className="display ct-title">
            <span style={{ color: "transparent", WebkitTextStroke: "2px #f3efe6" }}>
              Долучайся
            </span>
            <br />
            <span className="red">до SPARTA</span>
          </h2>

          <p className="lead ct-lead">
            Зроби перший крок до команди — залиш заявку у формі поруч. Підкажемо
            найближчу локацію, розклад і підберемо інвентар саме під тебе.
          </p>

          <div className="ct-cta">
            <span className="ct-cta__label">Або напишіть, де вам зручно</span>
            <div className="ct-cta__icons">
              {SOCIALS.map((s) => (
                <a className="ct-ibtn" key={s.k} href={s.href} target="_blank" rel="noopener" aria-label={s.k} title={s.k}>
                  <span className="ct-ibtn__ico"><Icon name={s.icon} /></span>
                </a>
              ))}
            </div>
            <a className="ct-maplink" href={MAPS} target="_blank" rel="noopener">
              <Icon name="pin" />
              <span>вул. Драгана, 7 · Львів</span>
              <b>дивитись на мапі →</b>
            </a>
          </div>
        </div>

        <div className="ct-formwrap">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

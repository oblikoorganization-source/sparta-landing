"use client";

import { useState } from "react";

const INTERESTS = ["Тренування", "Інвентар", "Літній табір", "Доросла команда"];

function FIcon({ name }: { name: string }) {
  if (name === "user")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="8" r="3.6" />
        <path d="M5 20c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6" />
      </svg>
    );
  if (name === "at")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M16 8.5V13a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5 7.1" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 5h16v11H8l-4 3.5V5Z" />
    </svg>
  );
}

type Errors = { name?: string; phone?: string };
type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [interest, setInterest] = useState("Тренування");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const clearErr = (k: keyof Errors) =>
    setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = (f.get("name") as string)?.trim() || "";
    const phone = (f.get("phone") as string)?.trim() || "";
    const note = (f.get("note") as string)?.trim() || "";

    // custom validation (no native browser bubbles)
    const errs: Errors = {};
    if (name.length < 2) errs.name = "Вкажіть, як до вас звертатися";
    if (phone.length < 3) errs.phone = "Лишіть телефон або @username для звʼязку";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        // Dual field names so this works against BOTH the local Next route
        // ({interest,note}) and the shared obliko lead-proxy Lambda on
        // *.obliko.org ({service,task,source}). Extra keys are ignored by each.
        body: JSON.stringify({
          interest,
          name,
          phone,
          note,
          service: interest,
          task: note,
          source: "sparta",
        }),
      });
      const data = await r.json().catch(() => ({}));
      // Next route returns {ok:true}; the obliko Lambda returns {success:true}.
      if (!r.ok || !(data.ok || data.success)) throw new Error();
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="form formx" onSubmit={onSubmit} noValidate>
      <div className="form__head">
        <h3 className="form__title">Залишити заявку</h3>
        <p className="form__sub">Кілька полів — і ми на звʼязку</p>
      </div>

      <div className="formx__chips">
        <span className="formx__caption">Оберіть, що вас цікавить</span>
        <div className="form__chips">
          {INTERESTS.map((i) => (
            <button
              type="button"
              key={i}
              className={`chip${interest === i ? " active" : ""}`}
              onClick={() => setInterest(i)}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <div className={`ff${errors.name ? " ff--err" : ""}`}>
        <span className="ff__ic"><FIcon name="user" /></span>
        <input
          id="cf-name"
          name="name"
          placeholder=" "
          autoComplete="name"
          aria-invalid={!!errors.name}
          onInput={() => clearErr("name")}
        />
        <label htmlFor="cf-name">Ваше імʼя</label>
        {errors.name && <span className="ff__err">{errors.name}</span>}
      </div>

      <div className={`ff${errors.phone ? " ff--err" : ""}`}>
        <span className="ff__ic"><FIcon name="at" /></span>
        <input
          id="cf-phone"
          name="phone"
          placeholder=" "
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          onInput={() => clearErr("phone")}
        />
        <label htmlFor="cf-phone">Телефон або @username</label>
        {errors.phone && <span className="ff__err">{errors.phone}</span>}
      </div>

      <div className="ff ff--area">
        <span className="ff__ic"><FIcon name="chat" /></span>
        <textarea id="cf-note" name="note" rows={3} placeholder=" " />
        <label htmlFor="cf-note">Коментар — вік, локація, питання</label>
      </div>

      <button type="submit" className="btn btn--solid formx__submit" disabled={status === "sending"}>
        {status === "sending" ? (
          <span className="formx__spin" aria-hidden="true" />
        ) : (
          <>
            <span>Надіслати заявку</span> <span className="arr">→</span>
          </>
        )}
      </button>

      {status === "error" && (
        <p className="formx__msg formx__msg--err">
          Не вдалося надіслати. Спробуйте ще раз або напишіть нам у{" "}
          <a href="https://t.me/flcsparta" target="_blank" rel="noopener">Telegram</a>.
        </p>
      )}

      {status === "sent" && (
        <div className="lead-modal" role="dialog" aria-modal="true" onClick={() => setStatus("idle")}>
          <div className="lead-modal__card" onClick={(e) => e.stopPropagation()}>
            <span className="lead-modal__check" aria-hidden="true">
              <svg viewBox="0 0 52 52">
                <circle className="lm-c" cx="26" cy="26" r="24" />
                <path className="lm-t" d="M15 27l8 8 14-16" />
              </svg>
            </span>
            <h4 className="lead-modal__title">Заявку надіслано!</h4>
            <p className="lead-modal__sub">
              Дякуємо — тренер звʼяжеться з вами найближчим часом.
            </p>
            <button type="button" className="btn btn--solid lead-modal__btn" onClick={() => setStatus("idle")}>
              <span>Чудово</span>
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

"use client";

import { Fragment } from "react";

const PHOTO = "/images/club-shot.jpg"; // IMG_4140 — Данило, збірна України
const VALUES = [
  "Християнські цінності",
  "Дисципліна",
  "Команда понад усе",
  "Турніри щомісяця",
  "13 країн з флорболом",
];
const PAPER = "#f3efe6";
const RED = "#e51f26";

export default function ClubSection() {
  return (
    <section id="club" className="clubv6 clubv6--photoL block--ink">
      <div className="clubv6__media">
        <img src={PHOTO} alt="Ревега Данило — збірна України" />
        <span className="clubv6__tag">
          <span className="clubv6__tag-n">Ревега Данило</span>
          <span className="clubv6__tag-r">
            <i />Засновник · головний тренер
          </span>
        </span>
      </div>

      <div className="clubv6__text">
        <div className="ck">
          <span className="ck__num">01</span>
          <span className="ck__lbl ck__lbl--4">Клуб</span>
        </div>

        <h2 className="display clubv6__title">
          <span style={{ display: "block", color: "transparent", WebkitTextStroke: `2px ${PAPER}` }}>
            Не секція.
          </span>
          <span style={{ display: "block", color: RED }}>Спосіб життя.</span>
        </h2>

        <blockquote className="cq cq--4">
          <span className="cq__mark">«</span>
          <span className="cq__first">Я</span> прийшов у цей спорт{" "}
          <span className="cq__k">16 років</span> тому — і вже у{" "}
          <span className="cq__k">16</span> почав{" "}
          <span className="cq__k">тренувати дітей</span>».
        </blockquote>

        <p className="ctxt ctxt--0">
          <span className="ctxt__s1">
            Гравець <span className="ctxt__k">збірної України</span>,{" "}
            <span className="ctxt__k">багаторазовий чемпіон</span>.
          </span>{" "}
          <span className="ctxt__s2">
            За <span className="ctxt__k">10 років</span> виростив клуб із кількох
            дітей у структуру з власною дорослою командою, що цілиться у{" "}
            <span className="ctxt__k">вищу лігу</span>.
          </span>
        </p>

        <ul className="clubv6__vals">
          {VALUES.map((v, i) => (
            <Fragment key={v}>
              <li>
                <i />
                {v}
              </li>
              {i === 2 && <li className="vbreak" aria-hidden="true" />}
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
}

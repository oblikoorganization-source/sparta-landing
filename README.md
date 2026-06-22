# Спарта — школа хокею на траві та флорболу

Лендинг для школи хокею «Спарта» (хокей на траві / флорбол).

## Стек (стандартний)
- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **GSAP 3.13** (`lib/gsap.ts`) + **ScrollTrigger** — анімації, scroll-reveal
- **Lenis** — плавний скрол (`components/SmoothScroll.tsx`)
- Шрифти: Oswald (заголовки) + Inter (текст)

## Структура
```
sparta-hockey/
├── app/
│   ├── layout.tsx      # root layout, шрифти, Header, SmoothScroll
│   ├── page.tsx        # сторінка: Hero + 5 секцій + footer, GSAP-анімації
│   └── globals.css     # дизайн-токени, layout, компоненти, адаптив
├── components/
│   ├── Header.tsx      # шапка + мобільне меню (бургер)
│   └── SmoothScroll.tsx
├── lib/gsap.ts         # центральна ініціалізація GSAP
└── public/{fonts,images}
```

## Запуск
```
npm install
npm run dev      # http://localhost:3000
```

## Палітра (Спарта — червоно-чорна)
`--c-red #d61f26` · `--c-red-dark #a1141a` · `--c-black #0d0d0f`

## Статус
🟡 База-каркас. Секції — заглушки, чекаємо контент:
Hero · Про школу · Програми · Тренери · Розклад · Контакти

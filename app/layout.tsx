import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Cursor from "@/components/Cursor";
import Progress from "@/components/Progress";
import Preloader from "@/components/Preloader";

const SITE = "https://sparta.lviv.ua";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "СПАРТА — флорбольний клуб у Львові · тренування та інвентар",
  description:
    "Флорбольний клуб «Спарта», Львів. Тренування для дітей і дорослих (вік 4–50), 4 локації на Сихові. Найбільший вибір флорбольного інвентарю в Україні: клюшки, м'ячі, взуття, аксесуари. Експертний підбір від гравця та тренера.",
  keywords: [
    "флорбол",
    "флорбол Львів",
    "клюшки для флорболу",
    "де купити клюшки для флорболу",
    "флорбольний інвентар Україна",
    "флорбольна секція Львів",
    "Спарта флорбол",
  ],
  openGraph: {
    title: "СПАРТА — флорбольний клуб у Львові",
    description:
      "Тренування для дітей і дорослих + найбільший вибір флорбольного інвентарю в Україні.",
    url: SITE,
    siteName: "ФК «SPARTA»",
    locale: "uk_UA",
    type: "website",
    images: ["/images/team-celebrate.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "СПАРТА — флорбольний клуб у Львові",
    description:
      "Тренування з флорболу для дітей і дорослих + найбільший вибір флорбольного інвентарю в Україні.",
    images: ["/images/team-celebrate.jpg"],
  },
  alternates: { canonical: SITE },
  icons: { icon: "/favicon.png" },
};

// Structured data (Schema.org) — invisible, parameterised by SITE so it tracks
// the canonical domain. SportsOrganization + training location + inventory store
// + the coach (E-E-A-T). Filled only with facts present on the site.
const SAME_AS = [
  "https://t.me/flcsparta",
  "https://www.instagram.com/flc_sparta",
  "https://www.tiktok.com/@flc.sparta",
];
const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "вул. Драгана, 7",
  addressLocality: "Львів",
  addressRegion: "Львівська область",
  addressCountry: "UA",
};
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SportsOrganization",
      "@id": `${SITE}/#organization`,
      name: "Флорбольний клуб «SPARTA»",
      alternateName: "ФК Спарта Львів",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/images/logo.png` },
      image: `${SITE}/images/team-celebrate.jpg`,
      description:
        "Флорбольний клуб «Спарта», Львів. Тренування з флорболу для дітей і дорослих (вік 4–50) на Сихові та найбільший в Україні вибір флорбольного інвентарю.",
      sport: "Floorball",
      areaServed: { "@type": "City", name: "Львів" },
      address: ADDRESS,
      founder: { "@id": `${SITE}/#danylo-reveha` },
      sameAs: SAME_AS,
    },
    {
      "@type": "SportsActivityLocation",
      "@id": `${SITE}/#location-main`,
      name: "ФК «SPARTA» — тренування з флорболу (Сихів, Львів)",
      parentOrganization: { "@id": `${SITE}/#organization` },
      url: SITE,
      address: ADDRESS,
      hasMap:
        "https://www.google.com/maps/search/?api=1&query=Drahana%207%2C%20Lviv%2C%20Ukraine",
      sameAs: SAME_AS,
    },
    {
      "@type": "Store",
      "@id": `${SITE}/#store`,
      name: "SPARTA — флорбольний інвентар",
      description:
        "Купити клюшки для флорболу в Україні: клюшки, мʼячі, взуття для залу, ворота, захист, аксесуари. Підбір від гравця збірної та тренера. Доставка по всій Україні.",
      url: `${SITE}/#inventory`,
      image: `${SITE}/images/team-celebrate.jpg`,
      priceRange: "1450–9000+ ₴",
      currenciesAccepted: "UAH",
      parentOrganization: { "@id": `${SITE}/#organization` },
      address: ADDRESS,
      areaServed: { "@type": "Country", name: "Україна" },
      sameAs: ["https://t.me/flcsparta"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Флорбольний інвентар",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Клюшки для флорболу",
              category: "Floorball sticks",
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "1450",
              maxPrice: "9000",
              priceCurrency: "UAH",
            },
            availability: "https://schema.org/InStock",
          },
          { "@type": "OfferCatalog", name: "Мʼячі для флорболу" },
          { "@type": "OfferCatalog", name: "Взуття для залу" },
          { "@type": "OfferCatalog", name: "Ворота та пасери" },
          { "@type": "OfferCatalog", name: "Захист (воротарський і польовий)" },
          { "@type": "OfferCatalog", name: "Аксесуари" },
        ],
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#danylo-reveha`,
      name: "Данило Ревега",
      jobTitle: "Засновник і головний тренер",
      worksFor: { "@id": `${SITE}/#organization` },
      image: `${SITE}/images/club-shot.jpg`,
      nationality: { "@type": "Country", name: "Україна" },
      description:
        "Гравець збірної України з флорболу, чемпіон України (Вища Ліга), капітан збірної U19, тренер жіночої збірної України (2019–2023). Тричі у «100 кращих тренерів року» за версією Львівської міської ради.",
      knowsAbout: [
        "Флорбол",
        "Спортивна підготовка дітей",
        "Підбір флорбольного інвентарю",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <head>
        {/* Tag Android before paint so the perf-CSS overrides apply with no flash.
            Android (phones+tablets) chokes on the heavy compositing; iOS doesn't. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(/android/i.test(navigator.userAgent))document.documentElement.classList.add('is-android')}catch(e){}",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&family=Big+Shoulders+Display:wght@700;800;900&family=Unbounded:wght@700;800;900&family=Syne:wght@700;800&family=Archivo+Black&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
        />
      </head>
      <body>
        <Preloader />
        <Progress />
        <Cursor />
        <Header />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

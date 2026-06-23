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
    locale: "uk_UA",
    type: "website",
    images: ["/images/team-celebrate.jpg"],
  },
  alternates: { canonical: SITE },
  icons: { icon: "/favicon.png" },
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

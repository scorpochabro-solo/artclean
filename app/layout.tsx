import type { Metadata, Viewport } from "next";
import {
  SITE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  BASE_PATH,
} from "@/lib/constants";
import { localBusinessLd, webSiteLd } from "@/lib/jsonld";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/providers/Preloader";
import { Analytics } from "@/components/Analytics";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s — Арт Клининг" },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  // Семантика проверена по выдаче: так ищут клининг в Костроме.
  keywords: [
    "клининг Кострома",
    "клининговая компания Кострома",
    "уборка квартир Кострома",
    "генеральная уборка Кострома",
    "уборка после ремонта Кострома",
    "послестроительная уборка",
    "уборка офисов Кострома",
    "уборка коттеджей и загородных домов",
    "поддерживающая уборка",
    "baby-клининг",
    "мытьё окон Кострома",
    "заказать уборку Кострома",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: true, address: false, email: false },
  alternates: { canonical: `${SITE_URL}/` },
  // Подтверждение владения в Google Search Console: TXT-запись в DNS умерла
  // вместе с удалённой зоной Cloudflare, мета-тег живёт вместе с сайтом.
  verification: {
    google: "cgkbURBsWTWOamlnnm6WLqLIgdgWMLG02PF3IOsu8ZA",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "geo.region": "RU-KOS",
    "geo.placename": "Кострома",
  },
};

export const viewport: Viewport = {
  themeColor: "#ede8dc",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <head>
        {/* Шрифты из public/ (не через webpack): url() внутри резолвятся от файла,
            поэтому CSS работает и на /artclean, и на корневом домене. */}
        <link rel="stylesheet" href={`${BASE_PATH}/fonts.css`} />
        {/* Preload критичных шрифтов (H1 и основной текст) — быстрее FCP/LCP. */}
        {[
          "cormorant-cyrillic-600-normal",
          "cormorant-cyrillic-600-italic",
          "manrope-cyrillic-400-normal",
        ].map((f) => (
          <link
            key={f}
            rel="preload"
            href={`${BASE_PATH}/fonts/${f}.woff2`}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteLd()),
          }}
        />
        <Preloader />
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}

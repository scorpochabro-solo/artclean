import {
  SITE_URL,
  SITE_NAME,
  SITE_SLOGAN,
  SITE_DESCRIPTION,
  PRICE_RANGE,
  AREA_SERVED,
  CITY,
} from "./constants";
import { services } from "@/content/services";
import { faq } from "@/content/faq";
import { contacts } from "@/content/contacts";

const areaServed = AREA_SERVED.map((name) => ({
  "@type": "AdministrativeArea",
  name,
}));

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/og.png`,
    logo: `${SITE_URL}/brand/logo-dark.png`,
    slogan: SITE_SLOGAN,
    telephone: contacts.phone,
    priceRange: PRICE_RANGE,
    currenciesAccepted: "RUB",
    address: {
      "@type": "PostalAddress",
      addressLocality: CITY,
      addressRegion: "Костромская область",
      addressCountry: "RU",
    },
    areaServed,
    sameAs: [contacts.instagram.href],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги «Арт Клининг»",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.summary,
        },
      })),
    },
  };
}

export function webSiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "ru-RU",
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

export function servicesLd() {
  return services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: s.summary,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
    },
    areaServed,
  }));
}

export function faqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

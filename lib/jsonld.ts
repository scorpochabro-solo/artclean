import {
  SITE_URL,
  SITE_NAME,
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
    telephone: contacts.phone,
    priceRange: PRICE_RANGE,
    address: {
      "@type": "PostalAddress",
      addressLocality: CITY,
      addressRegion: "Костромская область",
      addressCountry: "RU",
    },
    areaServed,
    sameAs: [contacts.instagram.href],
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

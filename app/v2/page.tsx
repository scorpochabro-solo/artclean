import type { Metadata } from "next";
import { HeroV2 } from "@/components/v2/HeroV2";
import { Problems } from "@/components/v2/Problems";
import { Spaces } from "@/components/v2/Spaces";
import { ServicesV2 } from "@/components/v2/ServicesV2";
import { LeadCta } from "@/components/v2/LeadCta";
import { Results } from "@/components/v2/Results";
import { VideoTeaser } from "@/components/v2/VideoTeaser";
import { Benefits } from "@/components/v2/Benefits";
import { AboutV2 } from "@/components/v2/AboutV2";
import { Team } from "@/components/v2/Team";
import { Contact } from "@/components/sections/Contact";
import { SITE_URL } from "@/lib/constants";

// Вариант 2 — «продающая» структура. Черновик для сравнения с основной версией:
// закрыт от индексации, в sitemap не включён (чтобы не плодить дубли контента).
export const metadata: Metadata = {
  title: "Вариант 2 — продающий лендинг",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/v2/` },
};

export default function HomeV2() {
  return (
    <>
      <HeroV2 />
      <Problems />
      <Spaces />
      <ServicesV2 />
      <LeadCta />
      <Results />
      <VideoTeaser />
      <Benefits />
      <AboutV2 />
      <Team />
      <Contact />
    </>
  );
}

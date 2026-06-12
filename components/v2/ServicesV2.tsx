"use client";

import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { services } from "@/content/services";
import { scrollToHash } from "@/lib/scroll";
import { ruTypo } from "@/lib/utils";

export function ServicesV2() {
  return (
    <section id="services" className="section-y pt-0">
      <Container>
        <SectionHead eyebrow="Услуги">
          Семь сценариев <em className="font-medium italic">чистоты</em>
        </SectionHead>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i, 4) * 0.05}>
              <article className="flex h-full flex-col rounded-[20px] border border-milk-200 p-6 md:p-7">
                <span className="text-eyebrow text-taupe-700">{s.index}</span>
                <h3 className="text-h3 mt-3">{s.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-[1.65] text-ink-700">
                  {ruTypo(s.summary)}
                </p>
                <button
                  type="button"
                  onClick={() => scrollToHash("#lead")}
                  className="group mt-5 inline-flex items-center gap-2 self-start text-sm font-medium text-ink-900"
                >
                  Рассчитать
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-[400ms] ease-quiet group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <div className="flex h-full flex-col items-start justify-center rounded-[20px] bg-ink-900 p-7 text-milk-100">
              <p className="font-display text-2xl leading-snug text-milk-50">
                Не нашли свой случай?
              </p>
              <p className="mt-2.5 text-sm leading-[1.65] text-milk-200">
                Расскажите о пространстве — соберём индивидуальный сценарий уборки.
              </p>
              <div className="on-dark mt-6">
                <Button href="#lead" tone="dark">
                  Обсудить задачу
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

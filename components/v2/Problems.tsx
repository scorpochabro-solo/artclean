"use client";

import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { problems } from "@/content/v2";
import { scrollToHash } from "@/lib/scroll";
import { ruTypo } from "@/lib/utils";

export function Problems() {
  return (
    <section id="problems" className="section-y">
      <Container>
        <SectionHead eyebrow="С чего начнём">
          Какая задача <em className="font-medium italic">у вашего пространства?</em>
        </SectionHead>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-16 md:gap-5">
          {problems.map((p, i) => (
            <Reveal key={p.problem} delay={Math.min(i, 4) * 0.05}>
              <button
                type="button"
                onClick={() => scrollToHash("#services")}
                className="group flex h-full w-full flex-col justify-between rounded-[20px] border border-milk-200 bg-milk-50 p-6 text-left transition-colors duration-[400ms] ease-quiet hover:border-ink-900 hover:bg-ink-900 md:p-7"
              >
                <span className="text-h3 block text-ink-900 transition-colors duration-[400ms] group-hover:text-milk-50">
                  {ruTypo(p.problem)}
                </span>
                <span className="mt-4 block text-sm leading-[1.6] text-ink-700 transition-colors duration-[400ms] group-hover:text-milk-200">
                  {ruTypo(p.solution)}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-5 inline-block text-ink-900 transition-all duration-[400ms] group-hover:translate-x-1 group-hover:text-milk-100"
                >
                  →
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

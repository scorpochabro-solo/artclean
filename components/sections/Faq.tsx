"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Collapse } from "@/components/ui/Collapse";
import { faq } from "@/content/faq";
import { cn, ruTypo } from "@/lib/utils";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-y">
      <Container>
        <SectionHead eyebrow="Вопросы">
          Отвечаем на <em className="font-medium italic">главные вопросы</em>
        </SectionHead>

        <div className="mt-12 max-w-3xl divide-y divide-milk-200 border-y border-milk-200">
          {faq.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={i}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-h3 pr-2">{item.q}</span>
                    <span
                      aria-hidden="true"
                      className="relative h-4 w-4 shrink-0 text-ink-900"
                    >
                      <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                      <span
                        className={cn(
                          "absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 origin-center bg-current transition-transform duration-[400ms] ease-quiet",
                          open ? "scale-y-0" : "scale-y-100",
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <Collapse open={open}>
                  <p
                    id={`faq-${i}`}
                    className="max-w-2xl pb-6 leading-[1.7] text-ink-700"
                  >
                    {ruTypo(item.a)}
                  </p>
                </Collapse>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import { Collapse } from "@/components/ui/Collapse";
import { Drop } from "@/components/ui/Drop";
import { services } from "@/content/services";
import { cn, ruTypo } from "@/lib/utils";

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="services" className="section-y">
      <Container>
        <SectionHead eyebrow="Услуги">
          Каждому пространству —{" "}
          <em className="font-medium italic">свой сценарий чистоты</em>
        </SectionHead>

        <div className="mt-12 flex flex-col gap-3 md:mt-16">
          {services.map((s, i) => {
            const open = openIndex === i;
            const hasDetails = Boolean(s.steps || s.bullets || s.body);
            return (
              <Reveal key={s.slug} delay={Math.min(i, 4) * 0.05}>
                <div
                  className={cn(
                    "group relative overflow-hidden rounded-[20px] border transition-colors duration-[400ms] ease-quiet",
                    open ? "border-ink-900" : "border-milk-200",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 bg-ink-900 transition-opacity duration-[400ms] ease-quiet",
                      open ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`svc-${s.slug}`}
                    className="relative z-10 flex w-full items-start gap-5 px-6 py-6 text-left md:gap-8 md:px-8 md:py-7"
                  >
                    <span
                      className={cn(
                        "text-eyebrow shrink-0 pt-1.5 transition-colors duration-[400ms]",
                        open
                          ? "text-taupe-500"
                          : "text-taupe-700 group-hover:text-taupe-500",
                      )}
                    >
                      {s.index}
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          "text-h3 block transition-colors duration-[400ms]",
                          open
                            ? "text-milk-50"
                            : "text-ink-900 group-hover:text-milk-50",
                        )}
                      >
                        {s.title}
                      </span>
                      <span
                        className={cn(
                          "measure mt-1.5 block text-sm leading-[1.6] transition-colors duration-[400ms]",
                          open
                            ? "text-milk-200"
                            : "text-ink-700 group-hover:text-milk-200",
                        )}
                      >
                        {ruTypo(s.summary)}
                      </span>
                    </span>
                    {hasDetails && (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "relative mt-2 h-4 w-4 shrink-0 transition-colors duration-[400ms]",
                          open
                            ? "text-milk-100"
                            : "text-ink-900 group-hover:text-milk-100",
                        )}
                      >
                        <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                        <span
                          className={cn(
                            "absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 origin-center bg-current transition-transform duration-[400ms] ease-quiet",
                            open ? "scale-y-0" : "scale-y-100",
                          )}
                        />
                      </span>
                    )}
                  </button>

                  {/* Всегда в DOM (не в Collapse) — ссылку видит и посетитель,
                      и поисковый робот: перелинковка на /uslugi/<slug>/. */}
                  <div className="relative z-10 -mt-2 px-6 pb-6 md:px-8 md:pl-[4.75rem]">
                    <Link
                      href={`/uslugi/${s.slug}/`}
                      className={cn(
                        "text-sm font-medium underline-offset-4 transition-colors duration-[400ms] hover:underline",
                        open
                          ? "text-milk-100"
                          : "text-ink-900 group-hover:text-milk-100",
                      )}
                    >
                      Подробнее об услуге →
                    </Link>
                  </div>

                  {hasDetails && (
                    <Collapse open={open}>
                      <div
                        id={`svc-${s.slug}`}
                        className="relative z-10 px-6 pb-7 md:px-8 md:pl-[4.75rem]"
                      >
                        {s.body && (
                          <p className="border-t border-milk-100/15 pt-6 text-sm leading-[1.65] text-milk-200">
                            {ruTypo(s.body)}
                          </p>
                        )}
                        {s.steps && (
                          <ol className="space-y-5 border-t border-milk-100/15 pt-6">
                            {s.steps.map((st, j) => (
                              <li key={j} className="flex gap-4">
                                <span className="text-eyebrow shrink-0 pt-1 text-taupe-500">
                                  {String(j + 1).padStart(2, "0")}
                                </span>
                                <div>
                                  <p className="font-display text-lg italic text-milk-50">
                                    {st.title}
                                  </p>
                                  <p className="mt-1 text-sm leading-[1.6] text-milk-200">
                                    {ruTypo(st.text)}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ol>
                        )}
                        {s.bullets && (
                          <ul className="space-y-3 border-t border-milk-100/15 pt-6">
                            {s.bullets.map((b, j) => (
                              <li
                                key={j}
                                className="flex gap-3 text-sm leading-[1.6] text-milk-200"
                              >
                                <Drop className="mt-1.5 h-2.5 w-auto shrink-0 text-taupe-500" />
                                <span>{ruTypo(b)}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </Collapse>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { reviews } from "@/content/reviews";

export function Reviews() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const scrollByDir = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({
      left: dir * el.clientWidth * 0.9,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const Arrow = ({ dir }: { dir: -1 | 1 }) => (
    <button
      type="button"
      aria-label={dir < 0 ? "Предыдущий отзыв" : "Следующий отзыв"}
      onClick={() => scrollByDir(dir)}
      className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-ink-900 text-ink-900 transition-colors duration-[450ms] ease-quiet hover:text-milk-100"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-bottom scale-y-0 bg-ink-900 transition-transform duration-[450ms] ease-quiet group-hover:scale-y-100"
      />
      <span className="relative z-10">{dir < 0 ? "←" : "→"}</span>
    </button>
  );

  return (
    <section id="reviews" className="section-y">
      <Container>
        <SectionHead eyebrow="Отзывы">
          Чистота, <em className="font-medium italic">которую замечают</em>
        </SectionHead>

        {/* Мобайл — свайп со snap; десктоп — статичная сетка 2 колонки (без скролла) */}
        <div
          ref={ref}
          className="mt-12 grid grid-flow-col auto-cols-[85%] gap-6 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] sm:auto-cols-[62%] md:mt-14 md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:gap-12 md:overflow-visible md:snap-none [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((r, i) => (
            <figure key={i} className="snap-start">
              <blockquote className="font-display text-[clamp(1.5rem,3vw,2.25rem)] italic leading-[1.3] text-ink-900">
                «{r.quote}»
              </blockquote>
              <figcaption className="mt-6 text-sm text-ink-700">
                <span className="font-medium">{r.author}</span> · {r.service}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex gap-3 md:hidden">
          <Arrow dir={-1} />
          <Arrow dir={1} />
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { reviews } from "@/content/reviews";
import { ruTypo } from "@/lib/utils";

/**
 * Отзывов два — карусель здесь была лишней и «багала» на телефонах.
 * Статичная раскладка: столбик на мобайле, две колонки на десктопе.
 * Понадобится карусель — вернём, когда отзывов станет 4+.
 */
export function Reviews() {
  return (
    <section id="reviews" className="section-y">
      <Container>
        <SectionHead eyebrow="Отзывы">
          Чистота, <em className="font-medium italic">которую замечают</em>
        </SectionHead>

        <div className="mt-12 grid gap-12 md:mt-14 md:grid-cols-2 md:gap-14">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure>
                <blockquote className="font-display text-[clamp(1.5rem,3vw,2.25rem)] italic leading-[1.3] text-ink-900">
                  «{ruTypo(r.quote)}»
                </blockquote>
                <figcaption className="mt-6 text-sm text-ink-700">
                  <span className="font-medium">{r.author}</span> · {r.service}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

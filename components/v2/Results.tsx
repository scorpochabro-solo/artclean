import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { results } from "@/content/v2";
import { BASE_PATH } from "@/lib/constants";

export function Results() {
  return (
    <section id="results" className="section-y">
      <Container>
        <SectionHead eyebrow="Результат работ">
          Чистота, которую <em className="font-medium italic">видно</em>
        </SectionHead>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-16 md:gap-6">
          {results.map((r, i) => (
            <Reveal key={r.photo} delay={Math.min(i, 4) * 0.05}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[20px]">
                  <Image
                    src={`${BASE_PATH}/photos/${r.photo}.jpg`}
                    alt={r.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="photo-tone object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-ink-700">
                  {r.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { spaces } from "@/content/v2";
import { ruTypo } from "@/lib/utils";
import { BASE_PATH } from "@/lib/constants";

export function Spaces() {
  return (
    <section id="spaces" className="section-y pt-0">
      <Container>
        <SectionHead eyebrow="Типы пространств">
          Работаем с любым <em className="font-medium italic">пространством</em>
        </SectionHead>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-16 md:gap-5">
          {spaces.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i, 3) * 0.06}>
              <figure className="group relative aspect-[3/4] overflow-hidden rounded-[20px]">
                <Image
                  src={`${BASE_PATH}/photos/${s.photo}.jpg`}
                  alt={s.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="photo-tone object-cover transition-transform duration-700 ease-quiet group-hover:scale-[1.04]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink-900/85 via-ink-900/40 to-transparent p-5 pt-14">
                  <span className="font-display text-xl text-milk-50">{s.title}</span>
                  <span className="mt-1 block text-[0.8rem] leading-[1.5] text-milk-200">
                    {ruTypo(s.text)}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

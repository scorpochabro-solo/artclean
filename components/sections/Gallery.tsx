import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { BASE_PATH } from "@/lib/constants";

const photos = [
  { file: "wardrobe", alt: "Разбор и систематизация гардероба" },
  { file: "nursery", alt: "Подготовка детской к встрече малыша" },
  { file: "towels", alt: "Свежий, бережно подготовленный текстиль" },
  { file: "surface", alt: "Безупречно чистая поверхность" },
  { file: "garden", alt: "Уход за придомовой территорией" },
  { file: "team", alt: "Обученная команда за работой" },
];

export function Gallery() {
  return (
    <section id="gallery" className="section-y">
      <Container>
        <SectionHead eyebrow="Атмосфера">
          Пространства, которым мы дарим{" "}
          <em className="font-medium italic">чистоту</em>
        </SectionHead>
      </Container>

      <Reveal delay={0.1}>
        <div className="mt-12 grid auto-cols-[78%] grid-flow-col gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scroll-px-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:auto-cols-[46%] md:mt-16 md:gap-6 md:px-16 md:scroll-px-16 lg:grid-flow-row lg:auto-cols-auto lg:grid-cols-3 lg:overflow-x-visible lg:px-16 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {photos.map((p) => (
            <figure
              key={p.file}
              className="relative aspect-[4/5] snap-start overflow-hidden rounded-[20px]"
            >
              <Image
                src={`${BASE_PATH}/photos/${p.file}.jpg`}
                alt={p.alt}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 30vw"
                className="photo-tone object-cover"
              />
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

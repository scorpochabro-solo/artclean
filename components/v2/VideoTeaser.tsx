import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Drop } from "@/components/ui/Drop";
import { BASE_PATH } from "@/lib/constants";

/**
 * Видео процесса. Видео у компании пока нет — честный тизер с постером.
 * TODO: заменить на реальное видео (mp4/WebM + poster) когда заказчик пришлёт.
 */
export function VideoTeaser() {
  return (
    <section id="video" className="section-y pt-0">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px]">
            <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
              <Image
                src={`${BASE_PATH}/photos/team.jpg`}
                alt="Специалист «Арт Клининг» за работой"
                fill
                sizes="(max-width: 768px) 100vw, 1280px"
                className="photo-tone object-cover"
              />
              <div className="absolute inset-0 bg-ink-900/45" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-milk-100/60 bg-milk-100/10 backdrop-blur-sm md:h-20 md:w-20">
                  <Drop className="h-7 w-auto text-milk-100 md:h-8" />
                </span>
                <Eyebrow tone="dark" className="mt-6 justify-center text-milk-200">
                  Видео процесса
                </Eyebrow>
                <p className="mt-3 max-w-md font-display text-2xl leading-snug text-milk-50 md:text-3xl">
                  Снимаем, как рождается чистота — видео скоро здесь
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

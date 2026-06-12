import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Drop } from "@/components/ui/Drop";
import { standardsIntro } from "@/content/standards";
import { ruTypo } from "@/lib/utils";
import { BASE_PATH } from "@/lib/constants";

const teamPoints = [
  "Онлайн-программы и очные тренинги с приглашённым экспертом",
  // TODO (бриф 5.5): уточнить формулировку про аттестацию.
  "Подготовка по внутренним стандартам компании",
  "Регулярное повышение квалификации",
];

// TODO: персональные карточки мастеров (фото + имя + специализация) — данные заказчика.
export function Team() {
  return (
    <section id="team" className="section-y pt-0">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[20px]">
              <Image
                src={`${BASE_PATH}/photos/team.jpg`}
                alt="Специалист «Арт Клининг» бережно работает с текстилем"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="photo-tone object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Мастера</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-h2 mt-5">
                Команда, которой <em className="font-medium italic">спокойно доверить дом</em>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="measure mt-6 leading-[1.7] text-ink-700">
                {ruTypo(standardsIntro)}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <ul className="mt-7 space-y-3">
                {teamPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[0.95rem] text-ink-700">
                    <Drop className="mt-1.5 h-3 w-auto shrink-0 text-taupe-500" />
                    <span>{ruTypo(p)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

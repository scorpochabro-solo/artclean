import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Drop } from "@/components/ui/Drop";
import { contacts } from "@/content/contacts";
import { ruTypo } from "@/lib/utils";
import { BASE_PATH } from "@/lib/constants";

const heroPoints = [
  "Смета фиксируется до начала работ",
  "Отдельная безопасная линейка для baby-клининга",
  "Приёмка результата вместе с вами",
];

export function HeroV2() {
  return (
    <section id="top" className="relative overflow-hidden pt-[var(--header-h)]">
      <Container className="grid items-center gap-10 pb-16 pt-12 md:gap-12 md:pb-24 md:pt-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow withDrop>
              Премиальный клининг · Кострома и&nbsp;область
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="text-h1 mt-6">
              Уборка премиум-класса —{" "}
              <em className="font-medium italic">для дома и&nbsp;бизнеса</em>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="measure mt-7 text-[1.0625rem] leading-[1.7] text-ink-700 md:text-lg">
              {ruTypo(
                "Обученная команда, профессиональная химия и спокойный, выверенный процесс. Назовём стоимость после короткой заявки — без сюрпризов в конце.",
              )}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-7 space-y-2.5">
              {heroPoints.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[0.95rem] text-ink-700">
                  <Drop className="mt-1.5 h-3 w-auto shrink-0 text-taupe-500" />
                  <span>{ruTypo(p)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="#lead">Рассчитать уборку</Button>
              <TextLink href="#services">Смотреть услуги</TextLink>
            </div>
            <p className="mt-6 text-sm text-taupe-700">
              Или сразу по телефону:{" "}
              <a
                href={contacts.phoneHref}
                className="font-medium text-ink-900 underline-offset-4 hover:underline"
              >
                {contacts.phone}
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px]">
            <Image
              src={`${BASE_PATH}/photos/hero-foam.jpg`}
              alt="Макро-текстура мыльной пены в молочной палитре"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="photo-tone object-cover"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

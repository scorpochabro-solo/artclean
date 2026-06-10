import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Placeholder } from "@/components/ui/Placeholder";
import { facts } from "@/content/facts";
import { ruTypo } from "@/lib/utils";

const paragraphs = [
  "«Арт Клининг» — клининговая компания, которая не просто убирает, а создаёт атмосферу чистоты и гармонии в вашем пространстве. Мы верим: чистота — это основа вашего вдохновения и спокойствия.",
  "Каждое пространство уникально. Мы обеспечиваем чистоту, полностью подстраиваясь под ваш ритм и запросы — будь то квартира, офис или коммерческое пространство. Мы заботимся о деталях, чтобы каждый уголок наполнялся чистотой, светом и комфортом.",
];

export function About() {
  return (
    <section id="about" className="section-y">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>О нас</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-h2 mt-5">
                Мы создаём чистоту,{" "}
                <em className="font-medium italic">которая вдохновляет</em>
              </h2>
            </Reveal>
            <div className="measure mt-7 space-y-5 text-[1.0625rem] leading-[1.7] text-ink-700">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.12 + i * 0.04}>
                  <p>{ruTypo(p)}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <Placeholder className="aspect-[3/4] w-full" label="Интерьер" />
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-milk-200 pt-12 sm:grid-cols-3 md:mt-24">
          {facts.map((f, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div>
                <div className="font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none text-ink-900">
                  <Counter value={f.value} prefix={f.prefix} suffix={f.suffix} />
                </div>
                <p className="measure mt-3 text-sm text-ink-700">{ruTypo(f.label)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { facts } from "@/content/facts";
import { ruTypo } from "@/lib/utils";

export function AboutV2() {
  return (
    <section id="about" className="section-y pt-0">
      <Container>
        <div className="rounded-[24px] border border-milk-200 p-7 md:p-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>О компании</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="text-h2 mt-5">
                  «Арт Клининг» — чистота,{" "}
                  <em className="font-medium italic">как искусство</em>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="measure mt-6 leading-[1.7] text-ink-700">
                  {ruTypo(
                    "Мы не просто убираем — мы создаём атмосферу чистоты и гармонии в вашем пространстве. Каждый объект уникален: подстраиваемся под ваш ритм и запросы, будь то квартира, офис или коммерческое пространство.",
                  )}
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col justify-center gap-7 lg:col-span-5">
              {facts.map((f, i) => (
                <Reveal key={i} delay={0.1 + i * 0.06}>
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-[clamp(2rem,4vw,3rem)] leading-none text-ink-900">
                      <Counter value={f.value} prefix={f.prefix} suffix={f.suffix} />
                    </span>
                    <span className="text-sm text-ink-700">{ruTypo(f.label)}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

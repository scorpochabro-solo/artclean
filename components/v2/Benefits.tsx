import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { Drop } from "@/components/ui/Drop";
import { benefits } from "@/content/v2";
import { ruTypo } from "@/lib/utils";

export function Benefits() {
  return (
    <section id="benefits" className="section-y">
      <Container>
        <SectionHead eyebrow="Преимущества">
          Почему нам <em className="font-medium italic">доверяют</em>
        </SectionHead>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-16 md:gap-5">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={Math.min(i, 4) * 0.05}>
              <div className="h-full rounded-[20px] bg-milk-50 p-6 md:p-7">
                <Drop className="h-4 w-auto text-taupe-500" />
                <h3 className="text-h3 mt-4">{b.title}</h3>
                <p className="mt-2.5 text-sm leading-[1.65] text-ink-700">
                  {ruTypo(b.text)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

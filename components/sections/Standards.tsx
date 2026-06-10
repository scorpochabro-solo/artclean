import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { Drop } from "@/components/ui/Drop";
import { standardsIntro, standardsCards } from "@/content/standards";
import { ruTypo } from "@/lib/utils";

export function Standards() {
  return (
    <section
      id="standards"
      className="on-dark section-y relative overflow-hidden bg-ink-900 text-milk-100"
    >
      <Drop
        className="pointer-events-none absolute -right-12 -top-12 h-80 w-auto text-milk-100/5"
      />
      <Container>
        <SectionHead
          tone="dark"
          eyebrow="Стандарты"
          intro={ruTypo(standardsIntro)}
        >
          Совершенно новый подход{" "}
          <em className="font-medium italic">к клинингу в Костроме</em>
        </SectionHead>

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3">
          {standardsCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="h-full rounded-[20px] border border-milk-100/20 p-7">
                <h3 className="text-h3 text-milk-50">{c.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-[1.65] text-milk-200">
                  {ruTypo(c.text)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

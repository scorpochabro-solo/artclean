import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/content/process";
import { ruTypo } from "@/lib/utils";

export function Process() {
  return (
    <section id="process" className="section-y">
      <Container>
        <SectionHead eyebrow="Подход">
          Спокойный процесс —{" "}
          <em className="font-medium italic">безупречный результат</em>
        </SectionHead>

        <ol className="mt-14 grid gap-x-8 gap-y-10 md:mt-20 md:grid-cols-5">
          {processSteps.map((s, i) => (
            <li key={s.num}>
              <Reveal delay={i * 0.07}>
                <div className="flex items-center gap-3">
                  <span className="text-eyebrow text-taupe-700">{s.num}</span>
                  <span className="h-px flex-1 bg-milk-200" />
                </div>
                <h3 className="text-h3 mt-4">{s.title}</h3>
                <p className="mt-2 text-sm leading-[1.65] text-ink-700">
                  {ruTypo(s.text)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

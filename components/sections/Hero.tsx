"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Marquee } from "@/components/ui/Marquee";
import { Placeholder } from "@/components/ui/Placeholder";
import { ruTypo } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const heroLines: React.ReactNode[] = [
  "Чистота,",
  <em key="accent" className="font-medium italic">
    как искусство
  </em>,
];

const marqueeWords = ["чистота", "гармония", "вдохновение", "детали", "забота"];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <section id="top" className="relative overflow-hidden pt-[var(--header-h)]">
      <div
        ref={ref}
        className="relative container-x grid items-center gap-10 pb-16 pt-12 md:gap-12 md:pb-24 md:pt-20 lg:grid-cols-12 lg:gap-16"
      >
        <div className="lg:col-span-7">
          <motion.div {...fade(0.1)}>
            <Eyebrow withDrop>Клининговая компания · Кострома и&nbsp;область</Eyebrow>
          </motion.div>

          <h1 className="text-h1 mt-6">
            {heroLines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.05em]">
                {reduce ? (
                  <span className="block">{line}</span>
                ) : (
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.12 }}
                  >
                    {line}
                  </motion.span>
                )}
              </span>
            ))}
          </h1>

          <motion.p
            {...fade(0.5)}
            className="measure mt-7 text-[1.0625rem] leading-[1.7] text-ink-700 md:text-lg"
          >
            {ruTypo(
              "Премиальный уход за домом, офисом и пространством для событий. Мы не просто убираем — мы создаём атмосферу, в которой хочется жить и вдохновляться.",
            )}
          </motion.p>

          <motion.div
            {...fade(0.62)}
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Button href="#contact">Рассчитать уборку</Button>
            <TextLink href="#services">Смотреть услуги</TextLink>
          </motion.div>
        </div>

        <motion.div {...fade(0.4)} className="lg:col-span-5">
          <motion.div style={reduce ? undefined : { y: imgY }}>
            <Placeholder
              className="aspect-[4/5] w-full"
              label="Макро-текстура пены"
            />
          </motion.div>
        </motion.div>
      </div>

      <Marquee items={marqueeWords} />
    </section>
  );
}

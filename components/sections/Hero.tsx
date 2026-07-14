"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import Image from "next/image";
import { ruTypo } from "@/lib/utils";
import { BASE_PATH } from "@/lib/constants";

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
          {/* Надзаголовок живёт ВНУТРИ h1: иначе главный заголовок страницы —
              «Чистота, как искусство», без слов «клининг» и «Кострома».
              Визуально всё как было, но поисковик видит услугу и город. */}
          <h1 className="text-h1">
            <motion.span {...fade(0.1)} className="block">
              <Eyebrow as="span" withDrop>
                Клининговая компания · Кострома и&nbsp;область
              </Eyebrow>
            </motion.span>

            <span className="mt-6 block">
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
            </span>
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
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Button href="#contact" className="w-full justify-center sm:w-auto">
              Рассчитать уборку
            </Button>
            <Button
              href="#services"
              arrow={false}
              className="w-full justify-center sm:w-auto"
            >
              Смотреть услуги
            </Button>
          </motion.div>
        </div>

        <motion.div {...fade(0.4)} className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px]">
            <motion.div
              style={reduce ? undefined : { y: imgY }}
              className="absolute inset-x-0 -top-[10%] h-[120%]"
            >
              <Image
                src={`${BASE_PATH}/photos/hero-foam.jpg`}
                alt="Макро-текстура мыльной пены в молочной палитре"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="photo-tone object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Marquee items={marqueeWords} />
    </section>
  );
}

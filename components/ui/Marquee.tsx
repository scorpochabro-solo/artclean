import { Drop } from "./Drop";

interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  // ponytail: трек = 2 одинаковые половины, анимация едет на -50% (бесшовный цикл).
  // Бесшовно только если одна половина шире экрана — иначе в конце цикла вплывает
  // пустота. Дублируем список до ~13 слов на половину (потолок ~3700px ширины;
  // поднять цель, если блокнёт на сверхшироком мониторе).
  const reps = Math.max(1, Math.ceil(13 / items.length));
  const filled = Array.from({ length: reps }, () => items).flat();

  const sequence = (prefix: string) =>
    filled.map((word, i) => (
      <span key={`${prefix}-${i}`} className="inline-flex items-center">
        <span className="font-display text-[1.35rem] italic text-taupe-500">
          {word}
        </span>
        <Drop className="mx-7 h-3.5 w-auto text-taupe-500/70" />
      </span>
    ));

  return (
    <div
      className="marquee overflow-hidden border-y border-milk-200 py-5"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {sequence("a")}
        {sequence("b")}
      </div>
    </div>
  );
}

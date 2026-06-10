import { Drop } from "./Drop";

interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  const sequence = (prefix: string) =>
    items.map((word, i) => (
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

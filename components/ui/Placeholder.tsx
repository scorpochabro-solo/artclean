import { cn } from "@/lib/utils";
import { Drop } from "./Drop";

interface PlaceholderProps {
  className?: string;
  label?: string;
}

/**
 * Нейтральный плейсхолдер фото в молочной гамме с лёгким шумом и каплей.
 * TODO: заменить на <Image> с реальным фото заказчика (см. TODO.md, раздел 4).
 */
export function Placeholder({ className, label }: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label ?? "Фотография будет добавлена позже"}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-[20px] bg-linear-to-br from-milk-50 via-milk-100 to-milk-200",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <Drop className="h-10 w-auto text-taupe-500/40" />
      {label && (
        <span className="text-eyebrow absolute bottom-4 left-5 text-taupe-500">
          {label}
        </span>
      )}
    </div>
  );
}

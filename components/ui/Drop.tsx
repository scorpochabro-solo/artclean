interface DropProps {
  className?: string;
}

/** Фирменная капля «Арт Клининг». Наследует цвет через currentColor. */
export function Drop({ className }: DropProps) {
  return (
    <svg
      viewBox="0 0 24 33"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 1.5C12 1.5 3.5 14 3.5 21.5C3.5 26.8 7.3 31 12 31C16.7 31 20.5 26.8 20.5 21.5C20.5 14 12 1.5 12 1.5Z" />
    </svg>
  );
}

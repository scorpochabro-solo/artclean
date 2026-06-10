import type { ReactNode } from "react";

export const fieldClass =
  "w-full rounded-xl border border-milk-200 bg-milk-50 px-4 py-3 text-ink-900 transition-colors duration-300 placeholder:text-taupe-500 focus:border-ink-900 focus:outline-none";

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function Field({ label, htmlFor, error, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-ink-700"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm font-medium text-ink-900" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

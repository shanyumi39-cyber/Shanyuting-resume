import { type ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  right?: ReactNode;
  /** default md:text-5xl + text-3xl for page titles; pass "small" to use the card-section size (text-xl md:text-2xl) */
  size?: "large" | "small";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  right,
  size = "large",
  className = "",
}: SectionHeadingProps) {
  const titleCls =
    size === "large"
      ? "text-3xl md:text-5xl font-medium text-white"
      : "text-xl md:text-2xl font-medium text-white";
  return (
    <div
      className={`flex flex-col ${
        right ? "md:flex-row md:items-end md:justify-between gap-4" : "gap-3"
      } ${className}`}
    >
      <div className="min-w-0 max-w-2xl">
        {eyebrow && (
          <p className="pl-[3px] text-[10px] uppercase tracking-widest text-white/50">
            {eyebrow}
          </p>
        )}
        <h2 className={`${eyebrow ? "mt-2 " : ""}${titleCls}`}>{title}</h2>
        {description && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">
            {description}
          </p>
        )}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}

import { clsx } from "@/lib/utils";

export default function SectionHeader({
  index,
  title,
  sub,
}: {
  index: string;
  title: string;
  sub?: string;
}) {
  return (
    <header className="mb-12 md:mb-16">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-semibold tracking-[0.3em] text-accent">
          [{index}]
        </span>
        <span className="h-px flex-1 bg-line" />
        {sub && (
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-faint">
            {sub}
          </span>
        )}
      </div>
      <h2 className="display mt-5 text-2xl font-semibold uppercase tracking-[0.12em] text-ink md:text-4xl">
        {title}
      </h2>
    </header>
  );
}

export function HeaderTag({
  code,
  label,
  className = "",
}: {
  code: string;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-sm border border-linestrong bg-panel2 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-dim",
        className
      )}
    >
      <span className="h-1 w-1 rounded-full bg-accent" />
      {code} · {label}
    </span>
  );
}
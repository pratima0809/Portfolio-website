import { clsx } from "@/lib/utils";

type Tone = "ok" | "warn" | "crit" | "accent" | "idle";

export const TONE_COLOR: Record<Tone, string> = {
  ok: "#34d399",
  warn: "#fbbf24",
  crit: "#fb7185",
  accent: "#22d3ee",
  idle: "#5a6b82",
};

export default function StatusDot({
  tone = "idle",
  label,
  ping = true,
  className = "",
}: {
  tone?: Tone;
  label?: string;
  ping?: boolean;
  className?: string;
}) {
  const color = TONE_COLOR[tone];
  return (
    <span
      className={clsx("inline-flex items-center gap-2", className)}
      role="img"
      aria-label={label ?? `status: ${tone}`}
    >
      <span className="relative inline-flex h-2 w-2">
        {ping && (
          <span
            className="animate-ping-ring absolute inline-flex h-full w-full rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
        <span
          className="animate-pulse-soft relative inline-flex h-2 w-2 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
        />
      </span>
      {label && (
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-dim">
          {label}
        </span>
      )}
    </span>
  );
}
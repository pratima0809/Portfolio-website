"use client";

import { SECTIONS } from "@/lib/data";
import { useClock, useScrollSpy } from "@/lib/hooks";
import ThemeToggle from "@/components/ThemeToggle";
import { clsx } from "@/lib/utils";

export default function StickyHeader({
  onStatusClick,
  openTerminal,
}: {
  onStatusClick: () => void;
  openTerminal: () => void;
}) {
  const { time, date } = useClock();
  const ids = SECTIONS.map((s) => s.id);
  const active = useScrollSpy(ids);

  return (
    <div className="sticky top-0 z-40 border-b border-line bg-void/85 backdrop-blur-md">
      {/* main status bar */}
      <div className="flex items-center justify-between gap-3 px-3 py-2 md:px-6 md:py-2.5">
        <div className="flex items-center gap-3 md:gap-4">
          <span className="display-wide hidden text-[0.7rem] font-bold uppercase tracking-[0.3em] text-ink sm:inline">
            PRATIMA <span className="text-accent">{"//"}</span> CYBER OPERATIONS
          </span>
          <span className="display-wide text-[0.7rem] font-bold uppercase tracking-[0.3em] text-ink sm:hidden">
            PRATIMA <span className="text-accent">{"//"}</span> CY-OPS
          </span>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <span className="hidden font-mono text-[0.62rem] tracking-[0.14em] text-faint md:inline">
            {date}
          </span>
          <span className="font-mono text-[0.7rem] font-semibold tracking-[0.14em] text-accent">
            {time}
          </span>
          <ThemeToggle />
          <button
            type="button"
            onClick={onStatusClick}
            aria-label="System status indicator — click to interact"
            className="group relative inline-flex h-6 w-6 items-center justify-center rounded-sm border border-line bg-panel2 transition-colors hover:border-accent/50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform group-hover:scale-150" />
          </button>
        </div>
      </div>

      {/* mobile nav */}
      <nav
        aria-label="Primary sections"
        className="border-t border-line px-2 py-1.5 lg:hidden"
      >
        <ul className="flex gap-1 overflow-x-auto">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  className={clsx(
                    "flex items-center gap-2 rounded-sm border px-2.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] transition-colors",
                    isActive
                      ? "border-accent/40 bg-accent/[0.08] text-accentsoft"
                      : "border-line text-faint"
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="text-[0.68rem] font-bold text-faint">
                    {s.index}
                  </span>
                  {s.label}
                </a>
              </li>
            );
          })}
          <li className="shrink-0">
            <button
              type="button"
              onClick={openTerminal}
              className="flex items-center gap-2 rounded-sm border border-line px-2.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-dim transition-colors hover:border-accent/40 hover:text-accent"
            >
              &gt;_ TERMINAL
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
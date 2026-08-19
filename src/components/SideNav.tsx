"use client";

import { SECTIONS } from "@/lib/data";
import { useScrollSpy } from "@/lib/hooks";
import { clsx } from "@/lib/utils";

export default function SideNav({ openTerminal }: { openTerminal: () => void }) {
  const ids = SECTIONS.map((s) => s.id);
  const active = useScrollSpy(ids);

  return (
    <nav
      aria-label="Primary sections"
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-1">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className="relative">
              <a
                href={`#${s.id}`}
                className={clsx(
                  "group flex h-9 w-9 items-center justify-center rounded-sm border font-mono text-[0.7rem] font-bold transition-all",
                  isActive
                    ? "border-accent/50 bg-accent/[0.12] text-accent"
                    : "border-line/70 bg-panel/60 text-faint hover:border-linestrong hover:text-dim"
                )}
                aria-current={isActive ? "true" : undefined}
                aria-label={`${s.label} — ${s.sub}`}
              >
                {s.index}
              </a>
              <span className="pointer-events-none absolute right-11 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm border border-line bg-panel px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-dim opacity-0 transition-opacity group-hover:opacity-100">
                {s.label}
              </span>
            </li>
          );
        })}
        <li className="relative">
          <button
            type="button"
            onClick={openTerminal}
            className="group mt-2 flex h-9 w-9 items-center justify-center rounded-sm border border-line/70 bg-panel/60 font-mono text-[0.9rem] text-dim transition-colors hover:border-accent/40 hover:text-accent"
            aria-label="Open terminal"
          >
            &gt;_
          </button>
          <span className="pointer-events-none absolute right-11 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm border border-line bg-panel px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-dim opacity-0 transition-opacity group-hover:opacity-100">
            terminal
          </span>
        </li>
      </ul>
    </nav>
  );
}
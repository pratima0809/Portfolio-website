"use client";

import { STAGES } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { clsx } from "@/lib/utils";

const STATE_STYLE: Record<
  string,
  { dot: string; ring?: boolean; badge: string; label: string }
> = {
  DONE: {
    dot: "bg-ok",
    badge: "border-ok/40 bg-ok/[0.08] text-ok",
    label: "◉ DONE",
  },
  ACTIVE: {
    dot: "bg-accent",
    ring: true,
    badge: "border-accent/40 bg-accent/[0.08] text-accentsoft",
    label: "● ACTIVE",
  },
  NEXT: {
    dot: "bg-faint",
    badge: "border-line text-faint",
    label: "○ NEXT",
  },
};

export default function Operations() {
  return (
    <section
      id="operations"
      className="relative scroll-mt-24 px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader index="02" title="OPERATIONS" />
        </Reveal>

        <Reveal>
          <p className="mb-12 max-w-2xl text-sm leading-relaxed text-dim md:text-base">
            Each stage is a capability switched on — completed ones are exercised in real projects, the next two are on the radar.
          </p>
        </Reveal>

        <div className="relative">
          {/* rail */}
          <div className="absolute bottom-4 left-[7px] top-4 w-px bg-line md:left-[9px]" />
          <ol className="space-y-8">
            {STAGES.map((s, i) => {
              const st = STATE_STYLE[s.state];
              return (
                <li key={s.code} className="relative pl-8 md:pl-10">
                  <Reveal delay={0.04 * i}>
                    {/* node */}
                    <span
                      className={clsx(
                        "absolute left-0 top-2 flex h-[15px] w-[15px] items-center justify-center md:h-[19px] md:w-[19px]",
                        st.ring && "animate-pulse-soft"
                      )}
                    >
                      {st.ring && (
                        <span className="animate-ping-ring absolute h-full w-full rounded-full bg-accent/50" />
                      )}
                      <span
                        className={clsx(
                          "h-[9px] w-[9px] rounded-full md:h-[11px] md:w-[11px]",
                          st.dot
                        )}
                      />
                    </span>

                    <div
                      className={clsx(
                        "group flex flex-col gap-2 rounded-sm border bg-panel/60 px-4 py-4 transition-colors hover:border-linestrong md:flex-row md:items-start md:gap-10",
                        s.state === "NEXT" ? "opacity-70" : ""
                      )}
                    >
                      <div className="flex shrink-0 items-baseline gap-4 md:w-44">
                        <span className="font-mono text-[0.62rem] font-bold text-faint group-hover:text-accent">
                          {s.code}
                        </span>
<h3 className="display text-base font-semibold uppercase tracking-[0.14em] text-ink md:text-lg">
                            <span className="animate-typed">{s.title}</span>
                          </h3>
                      </div>
                      <p className="flex-1 text-sm leading-relaxed text-dim">
                        {s.desc}
                      </p>
                      <span
                        className={clsx(
                          "inline-flex w-fit shrink-0 items-center rounded-sm border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em]",
                          st.badge
                        )}
                      >
                        {st.label}
                      </span>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
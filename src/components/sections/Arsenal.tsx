"use client";

import { useState } from "react";
import { ARSENAL } from "@/lib/data";
import type { Skill, SkillCategory } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { clsx } from "@/lib/utils";

const ACCENT: Record<string, { bar: string; text: string; chip: string }> = {
  accent: {
    bar: "bg-accent",
    text: "text-accent",
    chip: "border-accent/40 bg-accent/[0.08] text-accentsoft",
  },
  warn: {
    bar: "bg-warn",
    text: "text-warn",
    chip: "border-warn/40 bg-warn/[0.08] text-warn",
  },
  ok: {
    bar: "bg-ok",
    text: "text-ok",
    chip: "border-ok/40 bg-ok/[0.08] text-ok",
  },
  crit: {
    bar: "bg-crit",
    text: "text-crit",
    chip: "border-crit/40 bg-crit/[0.08] text-crit",
  },
};

const LEVEL_STYLE: Record<Skill["level"], string> = {
  APPLIED: "text-ok",
  USING: "text-accent",
  LEARNING: "text-warn",
};

export default function Arsenal() {
  return (
    <section id="arsenal" className="relative scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader index="03" title="ARSENAL" />
        </Reveal>
        <Reveal>
          <p className="mb-10 max-w-2xl text-sm leading-relaxed text-dim md:text-base">
            Tools I have actually used or am actively training on — select a module to see how it was used.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ARSENAL.map((cat, i) => (
            <Reveal key={cat.id} delay={0.05 * (i % 3)}>
              <CategoryCard cat={cat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ cat }: { cat: SkillCategory }) {
  const [open, setOpen] = useState<string | null>(null);
  const a = ACCENT[cat.accent];
  return (
    <TiltCard className="h-full">
      <div className="panel panel-hover flex h-full flex-col">
        <div className={clsx("h-0.5 w-full", a.bar)} />
        <div className="px-5 pt-4">
          <p className={clsx("font-mono text-[0.6rem] font-bold tracking-[0.24em]", a.text)}>
            {cat.code}
          </p>
          <h3 className="display mt-1 text-xl font-bold uppercase tracking-[0.12em] text-ink">
            {cat.name}
          </h3>
        </div>

        <ul className="mt-4 flex flex-1 flex-col px-3 pb-3">
          {cat.skills.map((s) => {
            const isOpen = open === s.name;
            return (
              <li key={s.name}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : s.name)}
                  aria-expanded={isOpen}
                  className={clsx(
                    "group flex w-full items-center justify-between gap-3 rounded-sm border px-3 py-2.5 text-left transition-colors",
                    isOpen
                      ? "border-accent/40 bg-accent/[0.05]"
                      : "border-transparent hover:border-line hover:bg-panel2"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-[0.62rem] font-bold text-faint group-hover:text-accent">
                      {s.name}
                    </span>
                    <span
                      className={clsx(
                        "font-mono text-[0.55rem] uppercase tracking-[0.16em]",
                        LEVEL_STYLE[s.level]
                      )}
                    >
                      {s.level}
                    </span>
                  </span>
                  <span
                    className={clsx(
                      "font-mono text-xs transition-transform",
                      isOpen ? "rotate-90 text-accent" : "text-faint"
                    )}
                  >
                    ▸
                  </span>
                </button>
                {isOpen && (
                  <div className="rounded-sm border border-line/60 bg-void/40 px-4 py-3">
                    <p className="text-xs leading-relaxed text-dim">{s.desc}</p>
                    {s.used && (
                      <p className="mt-2 font-mono text-[0.62rem] tracking-[0.06em] text-faint">
                        {s.used}
                      </p>
                    )}
                    {s.linked && (
                      <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ok">
                        → {s.linked}
                      </p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </TiltCard>
  );
}
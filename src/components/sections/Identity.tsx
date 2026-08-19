"use client";

import Image from "next/image";
import { IDENTITY } from "@/lib/data";
import Panel from "@/components/ui/Panel";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import StatusDot from "@/components/ui/StatusDot";

export default function Identity() {
  return (
    <section id="identity" className="relative scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader index="01" title="IDENTITY" />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          {/* ID card */}
          <Reveal className="md:col-span-2">
            <Panel brackened className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-faint">
                  {IDENTITY.id}
                </span>
                <StatusDot tone="ok" label="verified" ping={false} />
              </div>

              <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-5">
                <div className="group relative mb-4 shrink-0 sm:mb-0">
                  <div className="relative h-56 w-44 overflow-hidden bg-panel2 sm:h-64 sm:w-52">
                    <Image
                      src="/profile.jpg"
                      alt="Pratima Vanakhade — cybersecurity student"
                      fill
                      sizes="208px"
                      priority
                      className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-accent/[0.06] mix-blend-overlay" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-void/80 to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-void/80 to-transparent" />
                    <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />
                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(34,211,238,0.06)]" />
                    <span className="pointer-events-none absolute bottom-2 right-2 rounded-sm border border-ok/40 bg-void/80 px-1.5 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-ok">
                      ● LIVE
                    </span>
                  </div>
                  <p className="mt-2 text-center font-mono text-[0.55rem] uppercase tracking-[0.2em] text-faint sm:text-left">
                    PROFILE // CLASSIFIED
                  </p>
                </div>

                <div>
                  <p className="display text-xl font-bold leading-tight text-ink">
                    {IDENTITY.codeName}
                  </p>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-dim">
                    {IDENTITY.field}
                  </p>
                </div>
              </div>

              <dl className="mt-6 space-y-3 border-t border-line pt-5">
                <Detail label="FIELD" value="CYBERSECURITY" />
                <Detail label="OBJECTIVE" value={IDENTITY.objective} tone="text-accent" />
              </dl>
            </Panel>
          </Reveal>

          {/* profile */}
          <div className="md:col-span-3">
            <Reveal delay={0.1}>
              <p className="display text-2xl font-medium leading-snug text-ink md:text-[1.7rem]">
                {IDENTITY.summary}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 space-y-4">
                {IDENTITY.mindset.map((m, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="mt-1 font-mono text-[0.6rem] font-bold text-accent">
                      M-0{i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-dim md:text-[0.95rem]">
                      {m}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8">
                <p className="mono-label mb-3 text-faint">TRACKING // FOCUS AREAS</p>
                <div className="divide-y divide-line border-y border-line">
                  {IDENTITY.tracks.map((t) => (
                    <div key={t.key} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6">
                      <span className="w-36 shrink-0 font-mono text-[0.64rem] font-bold uppercase tracking-[0.2em] text-accent">
                        {t.key}
                      </span>
                      <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-dim">
                        {t.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* education + honesty note */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-5">
          <Reveal className="md:col-span-2">
                        <div className="space-y-3">
              {IDENTITY.education.map((e) => (
                <div key={e.role} className="flex items-center gap-1">
                  <span className="h-2 w-2 bg-accent" />
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-dim">
                    {e.role} <span className="text-faint">— {e.org}</span>
                  </p>
                </div>
              ))}
              <p className="pt-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-faint">
                {IDENTITY.education[0].note}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-3">
            <div className="rounded-sm border border-warn/30 bg-warn/[0.05] px-5 py-4">
              <p className="mono-label mb-1 text-warn">AUTHENTICITY CONTROL</p>
              <p className="text-xs leading-relaxed text-dim md:text-sm">
                {IDENTITY.notClaimed}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Detail({
  label,
  value,
  tone = "text-ink",
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <div>
      <dt className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-faint">
        {label}
      </dt>
      <dd className={`mt-0.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em] ${tone}`}>
        {value}
      </dd>
    </div>
  );
}
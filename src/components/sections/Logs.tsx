"use client";

import { ACHIEVEMENTS, CERTIFICATIONS, RESUME_SECTIONS } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import Panel from "@/components/ui/Panel";
import { clsx } from "@/lib/utils";

const TONE: Record<string, { chip: string; text: string; dot: string }> = {
  VERIFIED: { chip: "border-ok/40 bg-ok/[0.08] text-ok", text: "text-ok", dot: "bg-ok" },
  ACTIVE: { chip: "border-accent/40 bg-accent/[0.08] text-accentsoft", text: "text-accent", dot: "bg-accent" },
  BUILDING: { chip: "border-warn/40 bg-warn/[0.08] text-warn", text: "text-warn", dot: "bg-warn" },
};

export default function Logs() {
  return (
    <section id="logs" className="relative scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader index="06" title="LOGS & CREDENTIALS" />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* achievement log */}
          <div>
            <div className="space-y-4">
              {ACHIEVEMENTS.map((a, i) => {
                const t = TONE[a.state];
                return (
                  <Reveal key={a.title} delay={0.06 * i}>
                    <Panel hover className="flex gap-4 p-5">
                      <span className={clsx("relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center")}>
                        <span className={clsx("h-2.5 w-2.5 rounded-full", t.dot)} />
                        <span className="absolute h-10 w-px bg-line" style={{ top: 14 }} />
                      </span>
                      <div>
                        <span className={clsx("inline-flex rounded-sm border px-2 py-0.5 font-mono text-[0.56rem] font-bold uppercase tracking-[0.18em]", t.chip)}>
                          {a.state}
                        </span>
                        <h3 className="display mt-2 text-base font-bold uppercase tracking-[0.1em] text-ink">
                          {a.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-dim">{a.desc}</p>
                      </div>
                    </Panel>
                  </Reveal>
                );
              })}
            </div>

            {/* certifications */}
            <Reveal>
              <div className="mt-8">
                <div className="mb-3 flex items-center gap-3">
                  <span className="mono-label text-faint">CERTIFICATIONS</span>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <Panel className="p-5">
                  {CERTIFICATIONS.map((c) => (
                    <div key={c.name} className="flex items-center justify-between gap-3">
                      <div>
                        <p className="display text-sm font-semibold uppercase tracking-[0.1em] text-dim">{c.name}</p>
                        <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-faint">{c.issuer}</p>
                      </div>
                      <span className={clsx("rounded-sm border border-line px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-faint")}>
                        {c.state}
                      </span>
                    </div>
                  ))}
<p className="mt-4 border-t border-line pt-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-faint">
                    Slot for earned certifications — none invented.
                  </p>
                </Panel>
              </div>
            </Reveal>
          </div>

          {/* security credentials (resume) */}
          <div>
            <div className="mb-4 flex items-center justify-end gap-3">
              <ResumeButton />
            </div>

            <Reveal delay={0.05}>
              <Panel className="p-6">
                <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
                  <div>
                    <p className="display text-lg font-bold uppercase tracking-[0.1em] text-ink">PRATIMA VANAKHADE</p>
                    <p className="mono-label mt-1 text-faint">CYBERSECURITY STUDENT · <span className="text-ok">SEEKING INTERNSHIP</span></p>
                  </div>
                </div>

                <div className="space-y-5">
                  {RESUME_SECTIONS.map((s) => (
                    <section key={s.code}>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[0.6rem] font-bold text-accent">{s.code}</span>
                        <h4 className="mono-label text-ink">{s.title}</h4>
                        <span className="h-px flex-1 bg-line" />
                      </div>
                      <div className="mt-2.5 space-y-2.5">
                        {s.items.map((it) => (
                          <div key={it.head} className="border-l border-line pl-3">
                            <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink">{it.head}</p>
                            <p className="mt-0.5 text-xs leading-relaxed text-dim">{it.sub}</p>
                            {it.note && (
                              <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-warn">{it.note}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </Panel>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-4 px-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-faint">
                No security clearance is claimed. This 
“credentials” framing is a presentation style, not a document.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumeButton() {
  return (
    <button
      type="button"
      onClick={() => {
        const tip = document.createElement("div");
        tip.textContent = "Resume file not generated yet — a real file will replace this button.";
        tip.className =
          "fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-sm border border-warn/50 bg-void px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-warn";
        document.body.appendChild(tip);
        setTimeout(() => tip.remove(), 2600);
      }}
      className="inline-flex items-center gap-2 rounded-sm border border-accent/50 bg-accent/[0.08] px-3.5 py-2 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-accentsoft transition-colors hover:bg-accent/[0.16]"
    >
      ⤓ DOWNLOAD RESUME
    </button>
  );
}
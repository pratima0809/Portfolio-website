"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import Panel from "@/components/ui/Panel";
import StatusDot from "@/components/ui/StatusDot";
import { clsx } from "@/lib/utils";

export default function Contact() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2400);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader index="07" title="CONTACT" />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <Panel brackened glow className="flex h-full flex-col p-6 md:p-8">
              <div className="flex items-center gap-2">
                <StatusDot tone="ok" label={CONTACT.headline} />
              </div>
              <h3 className="display mt-8 text-3xl font-bold uppercase leading-tight tracking-[0.04em] text-ink md:text-4xl">
                {CONTACT.pitch}
              </h3>
<p className="mt-6 text-sm leading-relaxed text-dim">
                Open to internships, security engineering opportunities and any
                real problem worth solving.
              </p>
              <div className="mt-auto pt-8">
                <p className="border-t border-line pt-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-warn">
                  channel values pending — replace in data.ts
                </p>
              </div>
            </Panel>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-1">
            {CONTACT.channels.map((c, i) => {
              const placeholder = c.value.includes("YOUR-") || c.value.includes("your.");
              return (
                <Reveal key={c.id} delay={0.08 * i}>
                  <Panel hover className="flex items-center gap-4 px-5 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-linestrong bg-panel2 font-mono text-[0.7rem] font-bold text-accent">
                      {c.id === "email" ? "⊚" : c.id === "github" ? "</>" : "in"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mono-label text-faint">{c.label}</p>
                      <p className={clsx("mt-0.5 truncate font-mono text-[0.82rem] font-medium", placeholder ? "text-warn" : "text-ink")}>
                        {c.value}
                        {placeholder && (
                          <span className="ml-2 rounded-sm border border-warn/40 px-1.5 py-0.5 text-[0.5rem] uppercase tracking-[0.14em]">
                            pending
                          </span>
                        )}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        placeholder
                          ? showToast(`PENDING: ${c.hint}`)
                          : (
                              navigator.clipboard?.writeText(c.value),
                              showToast(`Copied ${c.id}: ${c.value}`)
                            )
                      }
                      className="shrink-0 rounded-sm border border-line px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-dim transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      {placeholder ? "SET" : "COPY"}
                    </button>
                  </Panel>
                </Reveal>
              );
            })}

            <Reveal delay={0.2}>
              <div className="rounded-sm border border-line bg-panel2/70 px-5 py-4">
                <p className="font-mono text-[0.62rem] uppercase leading-6 tracking-[0.18em] text-dim">
                  Seeking <span className="text-ok">SOC · VAPT · security tooling</span> internships — open to build-with-me projects.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-sm border border-warn/50 bg-void px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-warn shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        >
          {toast}
        </div>
      )}
    </section>
  );
}
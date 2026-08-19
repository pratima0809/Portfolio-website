"use client";

import { INTELLIGENCE } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import Panel from "@/components/ui/Panel";
import NetworkCanvas from "@/components/fx/NetworkCanvas";
import StatusDot from "@/components/ui/StatusDot";
import { clsx } from "@/lib/utils";

const TONE_CLASS: Record<string, string> = {
  ok: "text-ok",
  warn: "text-warn",
  accent: "text-accent",
};

const SEV_CLASS: Record<string, string> = {
  INFO: "text-faint",
  WARN: "text-warn",
  CRIT: "text-crit",
};

export default function Intelligence() {
  return (
    <section id="intelligence" className="relative scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader index="05" title="LIVE INTELLIGENCE" />
        </Reveal>

        <Reveal>
          <div className="mb-8 flex items-center gap-3 rounded-sm border border-warn/40 bg-warn/[0.05] px-4 py-3">
            <span className="animate-pulse-soft h-2 w-2 shrink-0 rounded-full bg-warn" />
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-warn">
              {INTELLIGENCE.sim}
            </p>
          </div>
        </Reveal>

        {/* status tiles */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {INTELLIGENCE.tiles.map((t, i) => (
            <Reveal key={t.key} delay={0.05 * i}>
              <Panel hover className="h-full px-4 py-5">
                <p className="mono-label text-faint">{t.key}</p>
                <p className={clsx("mt-2 font-mono text-lg font-bold tracking-[0.08em] md:text-xl", TONE_CLASS[t.tone])}>
                  {t.value}
                </p>
              </Panel>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* net graph */}
          <Reveal className="lg:col-span-3">
            <Panel className="relative h-[340px] overflow-hidden md:h-[400px]">
              <div className="absolute left-4 top-4 z-10 flex items-center gap-3">
                <span className="mono-label text-faint">NETWORK GRAPH</span>
                <StatusDot tone="ok" label="sim" />
              </div>
              <div className="absolute inset-0">
                <NetworkCanvas density={70} />
              </div>
            </Panel>
          </Reveal>

          {/* telemetry */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <Panel className="h-full">
              <div className="border-b border-line px-5 py-3">
                <p className="mono-label text-faint">SYSTEM TELEMETRY</p>
              </div>
              <dl className="grid grid-cols-2 gap-px bg-line">
                {INTELLIGENCE.telemetry.map((t) => (
                  <div key={t.label} className="bg-panel px-5 py-3.5">
                    <dt className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-faint">{t.label}</dt>
                    <dd className="mt-0.5 font-mono text-sm font-bold tracking-[0.06em] text-ink">{t.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="border-t border-line px-5 py-3">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-faint">
                  heartbeat: <span className="text-ok">◉ nominal</span>
                </p>
              </div>
            </Panel>
          </Reveal>
        </div>

        {/* event log */}
        <Reveal>
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="mono-label text-faint">SECURITY EVENT LOG</p>
            </div>
            <Panel className="overflow-hidden">
              <ul className="divide-y divide-line/60">
                {INTELLIGENCE.eventLog.map((e) => (
                  <li key={e.t} className="flex items-center gap-4 px-5 py-2.5">
                    <span className="font-mono text-[0.62rem] text-faint">{e.t}</span>
                    <span
                      className={clsx(
                        "w-12 shrink-0 font-mono text-[0.58rem] font-bold uppercase tracking-[0.12em]",
                        SEV_CLASS[e.sev] ?? "text-faint"
                      )}
                    >
                      {e.sev}
                    </span>
                    <span className="truncate font-mono text-[0.68rem] text-dim">{e.msg}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
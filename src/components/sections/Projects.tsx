"use client";

import { useEffect, useState } from "react";
import { DASHBOARD_SIM, PIPELINE, PROJECT } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import StatusDot from "@/components/ui/StatusDot";
import { clsx } from "@/lib/utils";

const SEV_STYLE: Record<string, string> = {
  CRITICAL: "text-crit border-crit/40 bg-crit/[0.08]",
  HIGH: "text-warn border-warn/40 bg-warn/[0.08]",
  MEDIUM: "text-accent border-accent/40 bg-accent/[0.08]",
  LOW: "text-ok border-ok/40 bg-ok/[0.08]",
  INFO: "text-faint border-line bg-panel2",
};

const SEV_HEX: Record<string, string> = {
  CRITICAL: "#fb7185",
  HIGH: "#fbbf24",
  MEDIUM: "#22d3ee",
  LOW: "#34d399",
  INFO: "#5a6b82",
};

export default function Projects({
  openCaseStudy,
}: {
  openCaseStudy: () => void;
}) {
  const [step, setStep] = useState(0);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    if (interacted) return;
    const id = setInterval(() => {
      setStep((s) => (s + 1) % PIPELINE.length);
    }, 2600);
    return () => clearInterval(id);
  }, [interacted]);

  const sevCounts = [
    { key: "CRITICAL", value: DASHBOARD_SIM.critical },
    { key: "HIGH", value: DASHBOARD_SIM.high },
    { key: "MEDIUM", value: DASHBOARD_SIM.medium },
    { key: "LOW", value: DASHBOARD_SIM.low },
    { key: "INFO", value: DASHBOARD_SIM.info },
  ];
  const total = sevCounts.reduce((a, b) => a + b.value, 0);
  const R = 46;
  const C = 2 * Math.PI * R;
  let acc = 0;

  return (
    <section id="projects" className="relative scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeader index="04" title="PROJECTS" />
        </Reveal>

        {/* flagship header */}
        <Reveal>
          <div className="panel corner-brackets glow-box relative overflow-hidden p-6 md:p-8">
            <div className="grid-bg-fine absolute inset-0 opacity-60" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[0.62rem] font-bold tracking-[0.26em] text-accent">
                  {PROJECT.id}
                </span>
                <span className="inline-flex items-center gap-2 rounded-sm border border-ok/40 bg-ok/[0.08] px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ok">
                  <StatusDot tone="ok" label={PROJECT.status} />
                </span>
                <span className="rounded-sm border border-line px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-dim">
                  {PROJECT.type}
                </span>
              </div>

              <h3 className="display mt-4 text-2xl font-bold uppercase leading-tight tracking-[0.06em] text-ink md:text-4xl">
                {PROJECT.name}
              </h3>

              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-dim md:text-[0.95rem]">
                {PROJECT.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <ActionButton tone="primary" onClick={() => document.getElementById("dashboard-sim")?.scrollIntoView({ behavior: "smooth", block: "center" })}>
                  ▶ VIEW PROJECT
                </ActionButton>
                <ActionButton onClick={openCaseStudy}>READ ARCHITECTURE</ActionButton>
                <SourcePlaceholder />
              </div>
            </div>
          </div>
        </Reveal>

        {/* highlight boxes */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECT.highlightBoxes.map((b, i) => (
            <Reveal key={b.code} delay={0.06 * i}>
              <div className="panel panel-hover h-full px-4 py-4">
                <p className="font-mono text-[0.6rem] font-bold text-accent">{b.code}</p>
                <p className="display mt-1 text-sm font-semibold uppercase tracking-[0.08em] text-ink">
                  {b.label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-dim">{b.value}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* pipeline + detail */}
        <Reveal>
          <div className="mt-16 mb-6 flex items-center gap-3">
            <span className="font-mono text-xs font-semibold tracking-[0.3em] text-accent">
              ATTACK WORKFLOW
            </span>
            <span className="h-px flex-1 bg-line" />
            <span className="rounded-sm border border-warn/40 bg-warn/[0.06] px-2 py-0.5 font-mono text-[0.56rem] uppercase tracking-[0.2em] text-warn">
              simulated
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* stage rail */}
          <div className="lg:col-span-2">
            <ol className="flex flex-col gap-1.5">
              {PIPELINE.map((p, i) => {
                const active = step === i;
                return (
                  <li key={p.key}>
                    <button
                      type="button"
                      onClick={() => {
                        setInteracted(true);
                        setStep(i);
                      }}
                      aria-current={active ? "true" : undefined}
                      className={clsx(
                        "group flex w-full items-center gap-3 rounded-sm border px-3 py-2.5 text-left transition-all",
                        active
                          ? "border-accent/50 bg-accent/[0.08]"
                          : "border-line/70 bg-panel/50 hover:border-linestrong"
                      )}
                    >
                      <span
                        className={clsx(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border font-mono text-[0.62rem] font-bold",
                          active ? "border-accent/60 text-accent" : "border-line text-faint"
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className="flex-1">
                        <span className={clsx("display block text-[0.95rem] font-semibold uppercase tracking-[0.14em]", active ? "text-ink" : "text-dim")}>
                          {p.label}
                        </span>
                      </span>
                      {i < PIPELINE.length - 1 && (
                        <span className={clsx("font-mono text-xs", active ? "text-accent" : "text-faint")}>↓</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* stage detail */}
          <div className="lg:col-span-3">
            <div className="panel sticky top-36 min-h-[320px] p-6" key={step}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[0.6rem] font-bold tracking-[0.24em] text-accent">
                    STAGE {String(step + 1).padStart(2, "0")} · {PIPELINE[step].key.toUpperCase()}
                  </p>
                  <h4 className="display mt-2 text-2xl font-bold uppercase tracking-[0.08em] text-ink">
                    {PIPELINE[step].label}
                  </h4>
                </div>
              </div>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-dim md:text-[0.95rem]">
                {PIPELINE[step].body}
              </p>
              <div className="mt-6 border-l-2 border-warn/50 bg-warn/[0.05] px-4 py-3">
                <p className="font-mono text-[0.72rem] text-dim">{PIPELINE[step].sim}</p>
              </div>
            </div>
          </div>
        </div>

        {/* simulated dashboard */}
        <div id="dashboard-sim" className="mt-20 scroll-mt-32">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-[0.3em] text-accent">
                FRAMEWORK DASHBOARD
              </span>
              <span className="h-px flex-1 bg-line" />
              <span className="rounded-sm border border-warn/40 bg-warn/[0.06] px-2 py-0.5 font-mono text-[0.56rem] uppercase tracking-[0.2em] text-warn">
                simulated
              </span>
            </div>
          </Reveal>

          <Reveal>
            <div className="panel overflow-hidden">
              {/* top stats */}
              <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
                <Stat label="SCAN STATUS" value="COMPLETED" tone="text-ok" />
                <Stat label="TARGET" value={DASHBOARD_SIM.target} tone="text-accent" />
                <Stat label="DURATION" value={DASHBOARD_SIM.duration} tone="text-ink" />
                <Stat label="HOSTS / PORTS" value={`${DASHBOARD_SIM.discoveredHosts} / ${DASHBOARD_SIM.openPorts}`} tone="text-ink" />
              </div>

              <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
                {/* donut */}
                <div className="flex flex-col items-center justify-center gap-4 rounded-sm border border-line bg-panel2 px-6 py-6">
                  <p className="mono-label self-start text-faint">SEVERITY DISTRIBUTION</p>
                  <svg viewBox="0 0 120 120" className="h-36 w-36" role="img" aria-label="Simulated severity distribution">
                    <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="10" />
                    {sevCounts.map((s) => {
                      const frac = s.value / total;
                      const dash = frac * C;
                      const el = (
                        <circle
                          key={s.key}
                          cx="60"
                          cy="60"
                          r={R}
                          fill="none"
                          stroke={SEV_HEX[s.key]}
                          strokeWidth="10"
                          strokeDasharray={`${dash - 2} ${C - dash + 2}`}
                          strokeDashoffset={-acc}
                          transform="rotate(-90 60 60)"
                          className="transition-all duration-700"
                        />
                      );
                      acc += dash;
                      return el;
                    })}
                    <text x="60" y="56" textAnchor="middle" className="font-mono" fontSize="13" fill="#dce5ef" fontWeight="700">
                      {total}
                    </text>
                    <text x="60" y="70" textAnchor="middle" fontSize="6.5" fill="#5a6b82" letterSpacing="2">
                      FINDINGS
                    </text>
                  </svg>
                  <div className="grid w-full grid-cols-1 gap-1.5">
                    {sevCounts.map((s) => (
                      <div key={s.key} className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.14em]">
                        <Count width={(s.value / total) * 100} color={SEV_HEX[s.key]} label={s.key} value={s.value} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* findings table */}
                <div className="rounded-sm border border-line bg-panel2 lg:col-span-2">
                  <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                    <p className="mono-label text-faint">TOP FINDINGS</p>
                  </div>
                  <ul className="divide-y divide-line/60">
                    {DASHBOARD_SIM.findings.map((f) => (
                      <li key={f.label} className="flex items-center gap-3 px-4 py-2.5">
                        <span className={clsx("w-20 shrink-0 rounded-sm border px-1.5 py-0.5 text-center font-mono text-[0.55rem] font-bold uppercase tracking-[0.08em]", SEV_STYLE[f.sev])}>
                          {f.sev}
                        </span>
                        <span className="flex-1 truncate font-mono text-[0.7rem] text-dim">{f.label}</span>
                        <span className="hidden shrink-0 font-mono text-[0.62rem] text-faint sm:inline">
                          {f.host}:{f.port}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* timeline + counts */}
              <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-4">
                <div className="bg-panel p-5 md:col-span-3">
                  <p className="mono-label mb-4 text-faint">SCAN TIMELINE</p>
                  <div className="relative">
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-line" />
                    <div className="flex items-center justify-between">
                      {DASHBOARD_SIM.scanTimeline.map((t, i) => (
                        <div key={t.label} className="relative flex flex-col items-center text-center">
                          <span className={clsx("relative z-10 h-2.5 w-2.5 rounded-full border-2 border-void", i === DASHBOARD_SIM.scanTimeline.length - 1 ? "bg-ok" : "bg-accent")} />
                          <span className="mt-2 font-mono text-[0.58rem] text-faint md:inline">{t.m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-panel p-5">
                  <p className="mono-label mb-3 text-faint">STATS</p>
                  <div className="space-y-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-dim">
                    <p><Counter to={DASHBOARD_SIM.discoveredHosts} className="text-ink" /> hosts</p>
                    <p><Counter to={DASHBOARD_SIM.openPorts} className="text-ink" /> open ports</p>
                    <p><Counter to={DASHBOARD_SIM.critical} className="text-crit" /> critical</p>
                    <p><Counter to={DASHBOARD_SIM.high} className="text-warn" /> high</p>
                    <p><Counter to={DASHBOARD_SIM.medium} className="text-accent" /> medium</p>
                  </div>
                </div>
              </div>

              {/* event strip */}
              <div className="border-t border-line bg-panel2 px-4 py-2">
                <div className="flex items-center gap-2 font-mono text-[0.62rem] text-faint">
                  <span className="uppercase tracking-[0.18em] text-warn">simulated</span>
                  <span className="truncate">
                    {DASHBOARD_SIM.events[0].t} · {DASHBOARD_SIM.events[0].lvl} · {DASHBOARD_SIM.events[0].msg}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="bg-panel px-4 py-3.5">
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-faint">{label}</p>
      <p className={`mt-1 overflow-hidden font-mono text-sm font-semibold tracking-[0.08em] ${tone}`}>{value}</p>
    </div>
  );
}

function Count({ label, value, width, color }: { label: string; value: number; width: number; color: string }) {
  return (
    <>
      <span className="w-14 shrink-0" style={{ color }}>{label}</span>
      <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-line">
        <span className="absolute inset-y-0 left-0" style={{ width: `${width}%`, backgroundColor: color }} />
      </span>
      <span className="w-6 text-right text-dim">{value}</span>
    </>
  );
}

function ActionButton({
  children,
  tone = "secondary",
  onClick,
}: {
  children: React.ReactNode;
  tone?: "primary" | "secondary";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-2 rounded-sm border px-4 py-2 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.22em] transition-colors",
        tone === "primary"
          ? "border-accent/60 bg-accent/[0.1] text-accentsoft hover:bg-accent/[0.2]"
          : "border-linestrong bg-panel2 text-dim hover:border-accent/50 hover:text-accent"
      )}
    >
      {children}
    </button>
  );
}

function SourcePlaceholder() {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        setPressed(true);
        setTimeout(() => setPressed(false), 1600);
      }}
      className={clsx(
        "inline-flex items-center gap-2 rounded-sm border px-4 py-2 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.22em] transition-colors",
        pressed
          ? "border-warn/60 bg-warn/[0.1] text-warn"
          : "border-linestrong bg-panel2 text-dim hover:border-warn/50 hover:text-warn"
      )}
    >
      {pressed ? "⚠ link pending" : "⌥ view source"}
      <span className="hidden text-[0.55rem] normal-case tracking-normal text-faint sm:inline">
        (repo link to be added)
      </span>
    </button>
  );
}
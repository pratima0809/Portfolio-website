"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { BOOT_LINES } from "@/lib/data";
import { usePrefersReducedMotion } from "@/lib/hooks";
import NetworkCanvas from "@/components/fx/NetworkCanvas";
import RadarSweep from "@/components/fx/RadarSweep";

export default function BootSequence({ onBoot }: { onBoot: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(reduced ? BOOT_LINES.length : 0);
  const [phase, setPhase] = useState<"booting" | "ready" | "granted">(
    reduced ? "ready" : "booting"
  );

  useEffect(() => {
    if (reduced) return;
    if (shown >= BOOT_LINES.length) {
      const t = setTimeout(() => setPhase("ready"), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 300 : 180);
    return () => clearTimeout(t);
  }, [shown, reduced]);

  const enter = useCallback(() => {
    setPhase("granted");
    setTimeout(onBoot, reduced ? 60 : 500);
  }, [onBoot, reduced]);

  useEffect(() => {
    if (phase !== "ready") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") enter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, enter]);

  return (
    <motion.div
      className="force-dark fixed inset-0 z-[90] flex flex-col bg-[#05070c]"
      exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
      aria-label="System boot sequence"
      role="dialog"
      aria-modal="false"
    >
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(720px 480px at 50% 0%, rgba(34,211,238,0.08), transparent 70%)",
        }}
      />
      {/* animated network background */}
      <div className="absolute inset-0 opacity-40">
        <NetworkCanvas density={80} />
      </div>
      {/* radar scope */}
      <div className="pointer-events-none absolute right-6 top-1/2 z-[2] hidden -translate-y-1/2 opacity-80 lg:block">
        <div className="relative h-72 w-72 overflow-hidden rounded-full border border-accent/25 bg-void/30">
          <div className="absolute inset-0">
            <RadarSweep />
          </div>
          <div className="scanlines absolute inset-0 opacity-30" />
          <span className="absolute left-1/2 top-2 -translate-x-1/2 font-mono text-[0.55rem] uppercase tracking-[0.24em] text-accent">
            RADAR // AWACS
          </span>
          <span className="absolute bottom-2 right-3 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-faint">
            sweeping
          </span>
        </div>
      </div>
      <div className="scanlines absolute inset-0" />

      <div className="relative flex min-h-full flex-col px-5 py-5 md:px-10 md:py-8">
        {/* top strip */}
        <div className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.25em] text-faint">
          <span>CYB-OPS v1.0 // SECURE BOOT</span>
          <span className="inline-flex items-center gap-2">
            <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-ok" />
            ALL SYSTEMS GO
          </span>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-3xl">
            {/* wordmark */}
            <div className="mb-10 text-center md:mb-14">
              <p className="mono-label mb-3 text-accent">PRATIMA VANAKHADE</p>
              <h1 className="display-wide text-3xl font-bold text-ink md:text-6xl">
                CYBER OPERATIONS
              </h1>
              <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
            </div>

            {/* log */}
            <div className="panel corner-brackets mx-auto min-h-[280px] p-5 font-mono text-xs leading-6 md:p-7 md:text-[0.8rem]">
              {BOOT_LINES.slice(0, shown).map((l, i) => (
                <div key={i} className="flex gap-3">
                  <span className="shrink-0 text-faint">{l.t}</span>
                  <span className="text-dim">
                    <span className="text-accent">▸</span> {l.msg}
                  </span>
                </div>
              ))}
              {phase === "booting" && (
                <span className="animate-blink-cursor ml-1 inline-block h-3 w-2 bg-accent align-middle" />
              )}

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.6rem] uppercase tracking-[0.2em] text-faint">
                <span className="inline-flex items-center gap-2">
                  <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-ok" />
                  SECURITY STATUS: ONLINE
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-warn" />
                  THREAT LEVEL: LOW
                </span>
              </div>
            </div>

            {/* enter */}
            <div className="mt-8 flex min-h-[56px] justify-center">
              <AnimatePresence>
                {phase === "ready" && (
                  <motion.button
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    onClick={enter}
                    className="display group relative inline-flex items-center gap-3 border border-accent/40 bg-accent/[0.06] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-accentsoft transition-colors hover:bg-accent/[0.14] focus-visible:outline-accent"
                  >
                    <span className="animate-pulse-soft h-2 w-2 rounded-full bg-accent" />
                    INITIALIZE SYSTEM
                    <span className="animate-blink-cursor ml-1 inline-block h-4 w-1 bg-accent" />
                  </motion.button>
                )}
                {phase === "granted" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="display text-sm font-bold uppercase tracking-[0.4em] text-ok text-glow"
                  >
                    ACCESS GRANTED
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
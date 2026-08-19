"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { IDENTITY } from "@/lib/data";
import StatusDot from "@/components/ui/StatusDot";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

export default function Hero() {
  const reduced = useReducedMotion();
  const item = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 26 },
    show: reduced
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      id="top"
      aria-label="Overview"
      className="relative flex min-h-[calc(100vh-104px)] flex-col overflow-hidden"
    >
      {/* scanning beam */}
      <div className="scan-beam animate-scan-y pointer-events-none absolute inset-x-0 top-0 z-10 h-40" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-[5] mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-5 py-16 md:px-8"
      >
        <motion.div variants={item} className="mb-5 flex items-center gap-2">
          <StatusDot tone="ok" label="systems online" />
        </motion.div>

        <motion.p
          variants={item}
          className="mono-label mb-3 text-accent"
        >
          SYSTEM INITIALIZATION
        </motion.p>

        <motion.div variants={item} className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="flex-1">
            <h1 className="display text-5xl font-bold leading-[0.92] tracking-[0.04em] text-ink md:text-7xl lg:text-[5.5rem]">
              PRATIMA
              <br />
              <span className="text-gradient-cyber">VANAKHADE</span>
            </h1>
          </div>

          <div className="group relative shrink-0">
            <div className="relative h-[340px] w-[280px] overflow-hidden md:h-[420px] md:w-[340px] lg:h-[460px] lg:w-[360px]">
              <Image
                src="/profile.jpg"
                alt="Pratima Vanakhade"
                fill
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 340px, 360px"
                priority
                className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
              />
              {/* cyan wash */}
              <div className="pointer-events-none absolute inset-0 bg-accent/[0.06] mix-blend-overlay" />
              {/* top edge fade */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-void via-void/60 to-transparent" />
              {/* bottom edge fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void via-void/70 to-transparent" />
              {/* left edge fade */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-void/80 to-transparent" />
              {/* right edge fade */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-void/80 to-transparent" />
              {/* scanlines */}
              <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />
              {/* subtle glow */}
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(34,211,238,0.06)]" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.26em] text-dim md:text-xs"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-accent" />
            CYBERSECURITY
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-warn" />
            ENGINEER // IN TRAINING
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-ok" />
            SOC / VAPT / AUTOMATION
          </span>
        </motion.div>

        {/* statement */}
        <motion.blockquote
          variants={item}
          className="mt-10 max-w-2xl border-l-2 border-accent/60 pl-5"
        >
          <p className="display text-lg font-medium leading-snug text-ink md:text-2xl">
            “{IDENTITY.statement}”
          </p>
        </motion.blockquote>

        {/* status readout panel */}
        <motion.div
          variants={item}
          className="mt-10 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-sm border border-line bg-panel sm:grid-cols-3"
        >
          <Readout label="SECURITY STATUS" value="● ONLINE" tone="text-ok" />
          <Readout label="THREAT LEVEL" value="LOW" tone="text-warn" />
          <Readout
            label="PRIMARY OBJECTIVE"
            value="BUILD • BREAK • DEFEND"
            tone="text-accent"
          />
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#identity"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-[5] -translate-x-1/2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-faint transition-colors hover:text-accent"
        aria-label="Scroll to identity section"
      >
        ▼ scroll to descend
      </motion.a>
    </section>
  );
}

function Readout({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="bg-panel px-4 py-3">
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-faint">
        {label}
      </p>
      <p className={`mt-1 font-mono text-xs font-semibold tracking-[0.12em] ${tone}`}>
        {value}
      </p>
    </div>
  );
}
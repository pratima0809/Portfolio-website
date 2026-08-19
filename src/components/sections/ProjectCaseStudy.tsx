"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { CASE_STUDY } from "@/lib/data";
import Panel from "@/components/ui/Panel";
import { clsx } from "@/lib/utils";

export default function ProjectCaseStudy({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const jumpTo = (id: string) => {
    const el = scrollRef.current?.querySelector(`#cs-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-hidden bg-void/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Project case study"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative my-4 w-[min(1080px,94vw)] overflow-hidden rounded-sm border border-linestrong bg-panel md:my-8"
          >
            {/* header */}
            <div className="glass sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line px-5 py-3 md:px-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.62rem] font-bold tracking-[0.26em] text-accent">
                  {CASE_STUDY.id}
                </span>
                <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.18em] text-dim md:inline">
                  AUTOMATED PENETRATION TESTING FRAMEWORK
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-sm border border-line px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-dim transition-colors hover:border-accent/50 hover:text-accent"
              >
                ✕ close
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr]">
              {/* section nav */}
              <aside className="hidden border-r border-line p-4 lg:block">
                <p className="mono-label mb-3 px-2 text-faint">DOC SECTIONS</p>
                <ol className="space-y-0.5">
                  {CASE_STUDY.sections.map((s) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => jumpTo(s.id)}
                        className="group flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left font-mono text-[0.64rem] uppercase tracking-[0.12em] text-dim transition-colors hover:bg-panel2 hover:text-accent"
                      >
                        <span className="text-faint group-hover:text-accent">{s.code}</span>
                        <span className="truncate">{s.title}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </aside>

              {/* content */}
              <div
                ref={scrollRef}
                className="scroll-smooth px-5 py-8 md:px-10 md:py-10"
                style={{ maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}
              >
                <p className="mono-label mb-8 text-warn">
                  NOTE: architecture and metrics narrated from the working project — no invented credentials.
                </p>

                {/* architecture diagram */}
                <section id="cs-architecture" className="mb-12 scroll-mt-24">
                  <h4 className="display mb-6 text-lg font-bold uppercase tracking-[0.14em] text-ink">
                    — ARCHITECTURE
                  </h4>
                  <Panel className="p-6">
                    <div className="flex flex-col items-center gap-1.5">
                      {CASE_STUDY.pipelineDiagram.map((n, i) => (
                        <div key={n.id} className="flex flex-col items-center">
                          <div
                            className={clsx(
                              "w-44 rounded-sm border px-3 py-2 text-center md:w-52",
                              n.id === "guard"
                                ? "border-warn/50 bg-warn/[0.07]"
                                : n.id === "out"
                                  ? "border-ok/50 bg-ok/[0.06]"
                                  : "border-linestrong bg-panel2"
                            )}
                          >
                            <p
                              className={clsx(
                                "font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em]",
                                n.id === "guard" ? "text-warn" : n.id === "out" ? "text-ok" : "text-accent"
                              )}
                            >
                              {n.label}
                            </p>
                            <p className="mt-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-faint">
                              {n.note}
                            </p>
                          </div>
                          {i < CASE_STUDY.pipelineDiagram.length - 1 && (
                            <span className="font-mono text-faint">↓</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 border-t border-line pt-4">
                      <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">
                        <span><span className="text-warn">■ SAFETY GATE</span> allowlist · validate · throttle</span>
                        <span><span className="text-accent">■ PIPELINE</span> two scanners → one result</span>
                        <span><span className="text-ok">■ OUTPUT</span> JSON + HTML reports</span>
                      </div>
                    </div>
                  </Panel>
                </section>

                {/* case study sections */}
                {CASE_STUDY.sections.map((s) => (
                  <section key={s.id} id={`cs-${s.id}`} className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-accent">{s.code}</span>
                      <h4 className="display text-base font-bold uppercase tracking-[0.16em] text-ink md:text-lg">
                        {s.title}
                      </h4>
                      <span className="h-px flex-1 bg-line" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-dim md:text-[0.95rem]">
                      {s.body}
                    </p>
                  </section>
                ))}

                <div className="border-t border-line pt-6 text-center">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-faint">
                    end of document · {CASE_STUDY.id}
                  </p>
                  <button
                    type="button"
                    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                    className="mt-4 rounded-sm border border-line px-4 py-2 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-dim transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    ← back to operations
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SECRETS } from "@/lib/data";
import StatusDot from "@/components/ui/StatusDot";

export default function SystemAudit({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [shown, setShown] = useState(0);
  const done = shown >= SECRETS.deepScanLines.length;

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setShown((s) => {
        if (s >= SECRETS.deepScanLines.length) {
          clearInterval(interval);
          return s;
        }
        return s + 1;
      });
    }, 420);
    return () => clearInterval(interval);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[85] flex items-center justify-center bg-void/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="System audit"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            className="w-full max-w-xl rounded-sm border border-linestrong bg-panel glow-box p-6 md:p-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="mono-label text-accent">DEEP SYSTEM AUDIT</p>
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-faint">entertainment only</span>
            </div>

            <div className="min-h-[220px] font-mono text-[0.78rem] leading-6">
              {SECRETS.deepScanLines.slice(0, shown).map((l, i) => (
                <p key={i} className="text-dim">
                  <span className="text-accent">▸</span> {l}
                </p>
              ))}
              {!done && <span className="animate-blink-cursor inline-block h-4 w-2 bg-accent" />}
            </div>

            {done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 rounded-sm border border-ok/40 bg-ok/[0.06] p-4"
              >
                <p className="display text-sm font-bold uppercase tracking-[0.18em] text-ok">
                  AUDIT COMPLETE // STATUS: TRAINEE — READY TO GROW
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
                  <StatusDot tone="ok" label="authenticity high" />
                  <StatusDot tone="ok" label="no fake claims" />
                  <StatusDot tone="warn" label="potential: unlimited" />
                </div>
              </motion.div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-sm border border-line px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-dim transition-colors hover:border-accent/50 hover:text-accent"
              >
                ✕ dismiss
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
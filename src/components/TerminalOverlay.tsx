"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ARSENAL,
  CONTACT,
  PROJECT,
  SECRETS,
  TERMINAL_BANNER,
  TERMINAL_HELP,
} from "@/lib/data";
import type { TermOutput } from "@/lib/data";
import { clsx } from "@/lib/utils";

const TONE_TEXT: Record<string, string> = {
  dim: "text-dim",
  accent: "text-accent",
  warn: "text-warn",
  ok: "text-ok",
  crit: "text-crit",
};

export default function TerminalOverlay({
  open,
  onClose,
  onDeepScan,
}: {
  open: boolean;
  onClose: () => void;
  onDeepScan: () => void;
}) {
  const [lines, setLines] = useState<TermOutput[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => {
        setLines([{ text: TERMINAL_BANNER, tone: "accent" }]);
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const push = (out: TermOutput[]) => setLines((l) => [...l, ...out]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    setLines((l) => [...l, { text: `pratima@cyb-ops:~$ ${raw}` }]);
    if (!cmd) return;

    switch (cmd) {
      case "help":
        push(TERMINAL_HELP);
        break;
      case "whoami":
        push([
          { text: "PRATIMA VANAKHADE", tone: "accent" },
          { text: "CYBERSECURITY STUDENT" },
          { text: "FOCUS: SECURITY ENGINEERING — SOC / VAPT / AUTOMATION", tone: "dim" },
          { text: "CLEARANCE: TRAINEE (and proud of it)", tone: "dim" },
        ]);
        break;
      case "skills":
        push(ARSENAL.map((c) => ({ text: `[${c.code}] ${c.name} — ${c.skills.map((s) => s.name).join(", ")}`, tone: "accent" as const })));
        break;
      case "projects":
        push([{ text: "[001] AUTOMATED PENETRATION TESTING FRAMEWORK", tone: "accent" }, { text: `  STATUS: ${PROJECT.status} · STACK: ${PROJECT.stack}`, tone: "dim" }, { text: "  — scroll to PROJECTS for the interactive walkthrough" }]);
        break;
      case "contact":
        push([...CONTACT.channels.map((c) => ({ text: `${c.label}: ${c.value}`, tone: "dim" as const }))]);
        break;
      case "clear":
        setLines([]);
        break;
      case "ls /projects":
        push([{ text: "projects/", tone: "accent" }, ...[
          "[001] automated-pentest-framework/",
          "   ├── nmap-adapter/",
          "   ├── zap-adapter/",
          "   ├── finding-engine/",
          "   ├── severity-classifier/",
          "   ├── database/",
          "   ├── auth/  (rbac + audit)",
          "   └── reports/  (json + html)",
        ].map((t) => ({ text: t, tone: "dim" as const }))]);
        break;
      case "cat /about":
        push([
          { text: "IDENTITY // 001", tone: "accent" },
          { text: "Who: cybersecurity student building toward internships and professional security roles." },
          { text: "What: systems that look for what others miss — build, break, defend.", tone: "dim" },
          { text: "Ethos: no fake credentials, no invented experience. Open, honest operator.", tone: "dim" },
        ]);
        break;
      case "scan portfolio":
      case "nmap --portfolio":
        push([
          { text: "PORT STATE SERVICE", tone: "accent" },
          { text: "443/tcp open https   — this portfolio (Next.js)" },
          { text: "22/tcp  filtered ssh  — not reachable, politely" },
          { text: "3000/tcp open dev     — localhost only" },
          { text: "Result: 1/1 human-accessible services found — the designer.", tone: "dim" },
        ]);
        break;
      case "sudo access":
        push([{ text: SECRETS.sudoAccess[0], tone: "warn" }]);
        break;
      case "sudo portfolio --deep-scan":
        push([{ text: "STARTING DEEP SYSTEM AUDIT…", tone: "accent" }]);
        onDeepScan();
        onClose();
        break;
      default:
        push([{ text: `command not found: ${cmd}`, tone: "crit" }, { text: "type 'help' for available commands", tone: "dim" }]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-void/85 p-3 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command terminal"
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="force-dark flex h-[min(80vh,640px)] w-full max-w-3xl flex-col overflow-hidden rounded-sm border border-linestrong bg-[#04070c] shadow-[0_0_80px_rgba(34,211,238,0.15)]"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-dim">
                <span className="h-2 w-2 rounded-full bg-crit" />
                <span className="h-2 w-2 rounded-full bg-warn" />
                <span className="h-2 w-2 rounded-full bg-ok" />
                <span className="ml-3">cyb-ops://terminal — tty0</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-sm border border-line px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-dim transition-colors hover:border-accent/50 hover:text-accent"
              >
                ✕ close
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[0.78rem] leading-6">
              {lines.map((l, i) => (
                <pre key={i} className={clsx("whitespace-pre-wrap", TONE_TEXT[l.tone ?? "accent"] ?? "text-accent")}>
                  {l.text}
                </pre>
              ))}
              <div className="flex items-center gap-2">
                <span className="text-accent">pratima@cyb-ops:~$</span>
                <span className="text-ink">{input}</span>
                <span className="animate-blink-cursor inline-block h-4 w-2 bg-accent" />
              </div>
            </div>

            <form
              className="border-t border-line px-4 py-3"
              onSubmit={(e) => {
                e.preventDefault();
                run(input);
                setInput("");
              }}
            >
              <label className="flex items-center gap-2 font-mono text-[0.78rem]">
                <span className="shrink-0 text-accent">pratima@cyb-ops:~$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal command input"
                  className="w-full bg-transparent font-mono text-ink caret-accent outline-none placeholder:text-faint"
                  placeholder="type 'help'…"
                />
              </label>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
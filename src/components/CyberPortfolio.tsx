"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import { useCallback, useState } from "react";
import { SECRETS } from "@/lib/data";
import { useEasterEggs } from "@/lib/hooks";
import BootSequence from "@/components/BootSequence";
import StickyHeader from "@/components/StickyHeader";
import SideNav from "@/components/SideNav";
import TerminalOverlay from "@/components/TerminalOverlay";
import SystemAudit from "@/components/SystemAudit";
import Hero from "@/components/sections/Hero";
import Identity from "@/components/sections/Identity";
import Operations from "@/components/sections/Operations";
import Arsenal from "@/components/sections/Arsenal";
import Projects from "@/components/sections/Projects";
import ProjectCaseStudy from "@/components/sections/ProjectCaseStudy";
import Intelligence from "@/components/sections/Intelligence";
import Logs from "@/components/sections/Logs";
import Contact from "@/components/sections/Contact";

export default function CyberPortfolio() {
  const [booted, setBooted] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [caseOpen, setCaseOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [statusClicks, setStatusClicks] = useState(0);

  const showToast = useCallback(
    (msg: string, ms = 3200) => {
      setToast(msg);
      window.setTimeout(() => setToast(null), ms);
    },
    []
  );

  useEasterEggs(
    () => showToast(SECRETS.konami),
    () =>
      showToast(
        SECRETS.sudoAccess[Math.floor(Math.random() * SECRETS.sudoAccess.length)]
      )
  );

  const onStatusClick = () => {
    const next = statusClicks + 1;
    setStatusClicks(next);
    if (next <= 5) {
      showToast(SECRETS.statusClicks[next - 1], 2200);
    } else {
      showToast(SECRETS.statusClicks[4], 3600);
    }
  };

  const openTerminal = useCallback(() => setTerminalOpen(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain relative">
        <AnimatePresence>
          {!booted && <BootSequence onBoot={() => setBooted(true)} />}
        </AnimatePresence>

        <StickyHeader onStatusClick={onStatusClick} openTerminal={openTerminal} />
        <SideNav openTerminal={openTerminal} />

        <main className="relative z-10">
          <Hero />
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Divider />
          </div>
          <div className="border-y border-line/50 bg-panel/30">
            <Identity />
          </div>
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Divider />
          </div>
          <Operations />

          <div className="bg-panel/20">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <Divider />
            </div>
            <Arsenal />
          </div>

          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Divider />
          </div>
          <Projects openCaseStudy={() => setCaseOpen(true)} />

          <div className="bg-panel/20">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <Divider />
            </div>
            <Intelligence />
          </div>

          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Divider />
          </div>
          <Logs />

          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Divider />
          </div>
          <Contact />

<footer className="border-t border-line py-10">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center md:flex-row md:justify-between md:px-8 md:text-left">
              <p className="display-wide text-[0.68rem] font-bold uppercase tracking-[0.3em] text-dim">
                PRATIMA <span className="text-accent">{"//"}</span> CYBER OPERATIONS
              </p>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-faint">
                Student today. Security engineer in the making.
              </p>
            </div>
          </footer>
        </main>

        <TerminalOverlay
          open={terminalOpen}
          onClose={() => setTerminalOpen(false)}
          onDeepScan={() => setAuditOpen(true)}
        />
        <SystemAudit open={auditOpen} onClose={() => setAuditOpen(false)} />
        <ProjectCaseStudy open={caseOpen} onClose={() => setCaseOpen(false)} />

        {toast && (
          <div
            role="status"
            className="fixed bottom-6 left-1/2 z-[60] w-[min(92vw,560px)] -translate-x-1/2 rounded-sm border border-accent/50 bg-void px-4 py-3 font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.12em] text-accentsoft shadow-[0_10px_50px_rgba(0,0,0,0.6)]"
          >
            <span className="mr-2 text-accent">█</span>
            {toast}
          </div>
        )}
      </div>
    </MotionConfig>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 py-2" aria-hidden="true">
      <span className="h-1 w-1 shrink-0 rounded-full bg-accent/60" />
      <span className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
    </div>
  );
}
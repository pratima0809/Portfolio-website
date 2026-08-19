"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribeMotion, getMotionSnapshot, () => false);
}

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const SUDO = ["s", "u", "d", "o", " ", "a", "c", "c", "e", "s", "s"];

export function useEasterEggs(onKonami: () => void, onSudo: () => void) {
  useEffect(() => {
    let konamiIdx = 0;
    let sudoIdx = 0;
    let sudoTimer: ReturnType<typeof setTimeout> | undefined;

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      konamiIdx =
        e.key === KONAMI[konamiIdx] ? konamiIdx + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (konamiIdx === KONAMI.length) {
        konamiIdx = 0;
        onKonami();
        return;
      }

      if (e.key === SUDO[sudoIdx]) {
        sudoIdx += 1;
      } else {
        sudoIdx = e.key === SUDO[0] ? 1 : 0;
      }
      if (sudoTimer) clearTimeout(sudoTimer);
      sudoTimer = setTimeout(() => {
        sudoIdx = 0;
      }, 2000);
      if (sudoIdx === SUDO.length) {
        sudoIdx = 0;
        onSudo();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (sudoTimer) clearTimeout(sudoTimer);
    };
  }, [onKonami, onSudo]);
}

export function useClock(intervalMs = 1000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    const sync = setTimeout(() => setNow(new Date()), intervalMs);
    return () => {
      clearInterval(id);
      clearTimeout(sync);
    };
  }, [intervalMs]);
  const pad = (n: number) => String(n).padStart(2, "0");
  return now
    ? {
        time: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
        date: now.toISOString().slice(0, 10),
      }
    : { time: "--:--:--", date: "----/--/--" };
}

export function useScrollSpy(ids: string[], offset = 0.4) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: `-${offset * 100}% 0px -${(1 - offset) * 100}% 0px`, threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, offset]);
  return active;
}
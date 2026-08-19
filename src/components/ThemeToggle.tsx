"use client";

import { useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    typeof document !== "undefined" &&
    document.documentElement.dataset.theme === "light"
      ? "light"
      : "dark"
  );

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "light"}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      title={theme === "light" ? "dark mode" : "light mode"}
      className="group flex h-6 w-6 items-center justify-center rounded-sm border border-line bg-panel2 text-dim transition-colors hover:border-accent/50 hover:text-accent"
    >
      {theme === "light" ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
          {[
            [0, 4],
            [0, 8],
            [4, 0],
            [8, 0],
          ].map(([x, y]) => (
            <path
              key={`${x}-${y}`}
              d={`M${12 + x} ${12 + y}v2M${12 + x} ${12 + y}h2`}
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ))}
        </svg>
      )}
    </button>
  );
}
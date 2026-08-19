"use client";

import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        document.documentElement.dataset.theme = storedTheme;
      }
    } catch {
      /* private mode / localStorage unavailable */
    }
  }, []);

  return null;
}
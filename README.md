# PRATIMA // CYBER OPERATIONS

A competition-grade cybersecurity portfolio built as a **personal cyber
operations interface** — part SOC dashboard, part digital forensics
workstation, part premium personal brand.

Student today. Security engineer in the making.

## Stack

- **Next.js 16** (App Router, static output) + React 19 + TypeScript
- **Tailwind CSS v4** design system
- **Framer Motion** for intentional motion (respects `prefers-reduced-motion`)
- Lightweight canvas network visualisation — no WebGL, no heavy deps

## Experience

1. **Boot sequence** — the site boots like a system, then grants access on
   INITIALIZE / Enter.
2. **Sticky system bar** — persistent status engine (clock, date, security
   status, threat level). Click the status indicator repeatedly.
3. **Side rail / mobile tabs** — `[01] IDENTITY … [07] CONTACT`.
4. **IDENTITY** — personnel dossier. Honest about being a student.
5. **OPERATIONS** — capability progression: Foundations → Security Engineering.
6. **ARSENAL** — interactive skill matrix, level-labelled truthfully
   (LEARNING / USING / APPLIED).
7. **PROJECTS** — flagship **Automated Penetration Testing Framework** with an
   interactive attack-workflow walkthrough, a clearly-flagged **simulated**
   dashboard, and a full case-study document incl. architecture diagram.
8. **LIVE INTELLIGENCE** — tasteful *simulated* telemetry (labelled as such).
9. **LOGS & CREDENTIALS** — achievement log + resume dossier.
10. **CONTACT** — secure channel, placeholder channels to replace.
11. **Terminal** (`>_` in nav) — `help`, `whoami`, `skills`, `projects`,
    `ls /projects`, `cat /about`, `scan portfolio`, `nmap --portfolio`,
    `sudo portfolio --deep-scan` …
12. **Easter eggs** — Konami code, typing `sudo access`, status-indicator
    clicks, deep-scan audit screen.

## Before going live — replace placeholders

Everything is honest by default. Add your real details:

| Where | What |
| --- | --- |
| `src/lib/data.ts` → `CONTACT` | real email, GitHub, LinkedIn |
| `src/lib/data.ts` → `PROJECT` / `Projects.tsx` | real source-repo link (the "VIEW SOURCE" button is a placeholder) |
| `src/lib/data.ts` → `CERTIFICATIONS` | earned certifications when you have them |
| `src/lib/data.ts` → `RESUME_SECTIONS.EDU` | your institution |
| `ResumeButton` | link the real resume file (drop it in `public/`) |

No fake credentials, no invented experience, no fabricated stats. The
intelligence section is clearly *simulated* and should stay labelled as such.

## Customising content

All copy, pipeline stages, simulated dashboards and easter-egg text live in
`src/lib/data.ts` — a single typed file. Component structure lives under
`src/components/sections/` and the design system (colours, type scale, panels,
keyframes) in `src/app/globals.css`.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static build + type check
npm run lint
```

## Design principles

- One accent family (cyan) used with restraint + amber/emerald/rose semantic
  tones.
- Near-black interface, hairline borders, corner brackets, grain, scanlines.
- Chakra Petch (display) / Inter (body) / JetBrains Mono (metadata).
- Reduced-motion friendly, keyboard navigable, semantic HTML, visible focus.
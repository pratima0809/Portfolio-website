export type Section = {
  id: string;
  index: string;
  label: string;
  sub: string;
};

export const SECTIONS: Section[] = [
  { id: "identity", index: "01", label: "IDENTITY", sub: "DOSSIER" },
  { id: "operations", index: "02", label: "OPERATIONS", sub: "PROGRESSION" },
  { id: "arsenal", index: "03", label: "ARSENAL", sub: "CAPABILITIES" },
  { id: "projects", index: "04", label: "PROJECTS", sub: "OPERATIONAL" },
  { id: "intelligence", index: "05", label: "INTELLIGENCE", sub: "LIVE // SIM" },
  { id: "logs", index: "06", label: "LOGS", sub: "ACHIEVEMENTS" },
  { id: "contact", index: "07", label: "CONTACT", sub: "SECURE CHANNEL" },
];

/* ── BOOT ─────────────────────────────────── */

export const BOOT_LINES: { t: string; msg: string }[] = [
  { t: "00:00:00", msg: "CYB-OPS v1.0 — SECURE BOOT SEQUENCE" },
  { t: "00:00:01", msg: "INITIALIZING SECURITY INTERFACE…" },
  { t: "00:00:02", msg: "LOADING IDENTITY — VANAKHADE, P." },
  { t: "00:00:03", msg: "LOADING PROJECTS — 001 DETECTED" },
  { t: "00:00:04", msg: "THREAT INTELLIGENCE ONLINE" },
  { t: "00:00:05", msg: "VERIFYING ARSENAL — 24 MODULES" },
  { t: "00:00:06", msg: "ENCRYPTION CHANNELS READY" },
  { t: "00:00:07", msg: "ACCESS PENDING OPERATOR CONFIRMATION" },
];

/* ── IDENTITY ─────────────────────────────── */

export const IDENTITY = {
  codeName: "PRATIMA VANAKHADE",
  id: "ID // CYS-0001",
  field: "CYBERSECURITY",
  subfield: "SOC / BLUE TEAM · VAPT · NETWORK SECURITY · ETHICAL HACKING · SECURITY AUTOMATION",
  objective: "Student today. Security engineer in the making.",
  statement:
    "I don't just study security. I build systems that look for what others miss.",
  summary:
    "Cybersecurity student working toward internships and professional roles in security. My focus is defensive operations — building, breaking, and defending systems the way a real SOC does.",
  mindset: [
    "Security is a mindset, not a toolset — I think in terms of attack surface, trust boundaries, and blast radius.",
    "Learn by building. Every concept I study becomes a working system.",
    "Documentation is a security control — if it isn't written down, it didn't happen.",
  ],
  tracks: [
    { key: "DEFENSIVE", value: "SOC concepts · threat detection · monitoring · log analysis" },
    { key: "OFFENSIVE", value: "VAPT · Nmap · Burp Suite · OWASP ZAP · web security" },
    { key: "ENGINEERING", value: "Python · FastAPI · SQLite · REST APIs · automation" },
    { key: "INFRASTRUCTURE", value: "Linux · Docker · Kubernetes · Jenkins · Terraform" },
  ],
  education: [
    {
      role: "CYBERSECURITY STUDENT",
      org: "Bachelor's degree programme",
      note: "Building professional skills in offensive and defensive security.",
    },
  ],
  notClaimed:
    "I'm still a student — I don't claim expert status in any of these areas. What I have is proven work: one full framework built, tested, and documented.",
};

/* ── OPERATIONS (timeline) ────────────────── */

export type Stage = {
  code: string;
  title: string;
  state: "DONE" | "ACTIVE" | "NEXT";
  desc: string;
};

export const STAGES: Stage[] = [
  {
    code: "F-01",
    title: "FOUNDATIONS",
    state: "DONE",
    desc: "Core security concepts, cryptography basics, CIA triad, defense-in-depth.",
  },
  {
    code: "F-02",
    title: "LINUX",
    state: "DONE",
    desc: "Command line, file systems, permissions, users, services. Daily driver in Kali.",
  },
  {
    code: "F-03",
    title: "NETWORKING",
    state: "DONE",
    desc: "TCP/IP, ports, protocols, subnets, DNS, HTTP/S — the attack surface floor.",
  },
  {
    code: "F-04",
    title: "WEB SECURITY",
    state: "DONE",
    desc: "OWASP Top 10, input validation, auth flaws, Burp Suite workflow.",
  },
  {
    code: "F-05",
    title: "SECURITY AUTOMATION",
    state: "DONE",
    desc: "Scripting security tasks with Python — turning manual steps into repeatable workflows.",
  },
  {
    code: "F-06",
    title: "PENETRATION TESTING",
    state: "ACTIVE",
    desc: "Built an automated pentest framework integrating Nmap, OWASP ZAP, findings engine and reports.",
  },
  {
    code: "F-07",
    title: "SOC / BLUE TEAM",
    state: "NEXT",
    desc: "Detection engineering, monitoring, alerting and incident response next on the roadmap.",
  },
  {
    code: "F-08",
    title: "SECURITY ENGINEERING",
    state: "NEXT",
    desc: "Long-term objective: building and operating secure products end to end.",
  },
];

/* ── ARSENAL ──────────────────────────────── */

export type Skill = {
  name: string;
  level: "LEARNING" | "USING" | "APPLIED";
  desc: string;
  used: string;
  linked?: string;
};

export type SkillCategory = {
  id: string;
  code: string;
  name: string;
  role: string;
  accent: "accent" | "warn" | "ok" | "crit";
  skills: Skill[];
};

export const ARSENAL: SkillCategory[] = [
  {
    id: "recon",
    code: "A-01",
    name: "RECON",
    role: "PASSIVE & ACTIVE DISCOVERY",
    accent: "accent",
    skills: [
      {
        name: "Nmap",
        level: "APPLIED",
        desc: "Network discovery, port scanning, service and version detection, scripted scans.",
        used: "Core scanner inside my automated pentest framework — full scan lifecycle with safety zones.",
        linked: "Automated Pentesting Framework",
      },
      {
        name: "Networking",
        level: "USING",
        desc: "TCP/IP stack, ports, protocols, DNS, subnets, routing and firewalls.",
        used: "Interpreting scan results and mapping discovered services to attack surface.",
      },
      {
        name: "OSINT concepts",
        level: "LEARNING",
        desc: "Open-source intelligence methods and passive footprinting principles.",
        used: "Part of my reconnaissance study track.",
      },
    ],
  },
  {
    id: "offensive",
    code: "A-02",
    name: "OFFENSIVE",
    role: "VULNERABILITY & EXPLOIT MIND",
    accent: "crit",
    skills: [
      {
        name: "Burp Suite",
        level: "USING",
        desc: "Intercepting proxy for web traffic analysis, repeater, and manual testing.",
        used: "Web application testing during VAPT practice.",
      },
      {
        name: "OWASP ZAP",
        level: "APPLIED",
        desc: "Automated web app scanning, active/passive scans, alert monitoring.",
        used: "Second active scanner integrated into my framework for web-layer findings.",
        linked: "Automated Pentesting Framework",
      },
      {
        name: "VAPT",
        level: "USING",
        desc: "Vulnerability assessment and penetration testing methodology.",
        used: "Combining recon, scanning and manual verification into a findings pipeline.",
      },
      {
        name: "Web security",
        level: "USING",
        desc: "OWASP Top 10, injection, XSS, auth weaknesses, misconfigurations.",
        used: "Classifying and triaging web-layer scanner findings.",
      },
    ],
  },
  {
    id: "defensive",
    code: "A-03",
    name: "DEFENSIVE",
    role: "SOC / BLUE TEAM",
    accent: "ok",
    skills: [
      {
        name: "SOC concepts",
        level: "LEARNING",
        desc: "Tiered detection, monitoring, triage and response workflows.",
        used: "Active learning track — next focus area after scanning automation.",
      },
      {
        name: "Threat detection",
        level: "LEARNING",
        desc: "Signature and behaviour-based detection methods.",
        used: "Studying detection across the monitoring stack.",
      },
      {
        name: "Security monitoring",
        level: "LEARNING",
        desc: "Continuous collection and review of security-relevant events.",
        used: "Preparing to connect log pipelines to SIEM tooling.",
      },
      {
        name: "Log analysis",
        level: "LEARNING",
        desc: "Parsing and correlating logs for suspicious activity.",
        used: "Reading Nmap/ZAP output and application audit logs in my framework.",
      },
    ],
  },
  {
    id: "engineering",
    code: "A-04",
    name: "ENGINEERING",
    role: "SECURITY BUILD",
    accent: "accent",
    skills: [
      {
        name: "Python",
        level: "APPLIED",
        desc: "Core language for security tooling and automation.",
        used: "Entire framework architecture written in Python — scanner orchestration, finding engine, API.",
        linked: "Automated Pentesting Framework",
      },
      {
        name: "FastAPI",
        level: "APPLIED",
        desc: "Modern async Python API framework.",
        used: "REST backend exposing scans, findings, reports and dashboards.",
        linked: "Automated Pentesting Framework",
      },
      {
        name: "SQLite",
        level: "APPLIED",
        desc: "Embedded relational database.",
        used: "Persists scans, findings, users, roles and audit events.",
        linked: "Automated Pentesting Framework",
      },
      {
        name: "REST APIs",
        level: "APPLIED",
        desc: "Resource-oriented HTTP APIs with auth and typed schemas.",
        used: "FastAPI routes with authentication, RBAC and audit logging.",
        linked: "Automated Pentesting Framework",
      },
    ],
  },
  {
    id: "infrastructure",
    code: "A-05",
    name: "INFRASTRUCTURE",
    role: "OPERATE & DEPLOY",
    accent: "warn",
    skills: [
      { name: "Docker", level: "USING", desc: "Containerized services and consistent environments.", used: "Containerising Python services for clean deploys." },
      { name: "Kubernetes", level: "LEARNING", desc: "Container orchestration and cluster lifecycle.", used: "Active learning track for platform security." },
      { name: "Jenkins", level: "LEARNING", desc: "CI/CD pipelines and automation servers.", used: "Studying pipeline-based test and build automation." },
      { name: "Terraform", level: "LEARNING", desc: "Infrastructure as code provisioning.", used: "Learning declarative infra and config management." },
    ],
  },
  {
    id: "observability",
    code: "A-06",
    name: "OBSERVABILITY",
    role: "MEASURE & DETECT",
    accent: "ok",
    skills: [
      { name: "Prometheus", level: "LEARNING", desc: "Metrics collection and time-series querying.", used: "Roadmap: wiring framework runtime metrics." },
      { name: "Grafana", level: "LEARNING", desc: "Dashboards and visualization.", used: "Roadmap: operational dashboards for the framework." },
      { name: "ELK", level: "LEARNING", desc: "Elasticsearch, Logstash, Kibana log pipeline.", used: "Roadmap: centralised log analysis." },
      { name: "Vault", level: "LEARNING", desc: "Secrets management.", used: "Studying secrets hygiene for the framework." },
    ],
  },
];

/* ── PROJECT ──────────────────────────────── */

export const PROJECT = {
  id: "PROJECT // 001",
  name: "AUTOMATED PENETRATION TESTING FRAMEWORK",
  short: "Automated Pentesting Framework",
  status: "OPERATIONAL",
  type: "SECURITY AUTOMATION",
  stack: "Python / FastAPI / Nmap / OWASP ZAP / SQLite",
  summary:
    "An orchestrated penetration testing framework that turns a target into a structured findings report. It runs Nmap and OWASP ZAP scans inside safety controls, classifies findings by severity, persists everything to SQLite, and serves JSON + HTML reports through a FastAPI dashboard — with auth, RBAC and a full audit trail.",
  highlightBoxes: [
    { code: "S-01", label: "FINDING ENGINE", value: "NORMALISES Nmap + ZAP RESULTS INTO ONE STRUCTURED MODEL" },
    { code: "S-02", label: "SEVERITY CLASSIFICATION", value: "CRITICAL → HIGH → MEDIUM → LOW → INFO" },
    { code: "S-03", label: "SAFETY CONTROLS", value: "ALLOWLIST TARGETS, RATE LIMITS, CONFIRMED TARGETS ONLY" },
    { code: "S-04", label: "AUDIT TRAIL", value: "EVERY ACTION LOGGED — WHO DID WHAT, WHEN" },
  ],
};

export type PipelineStage = {
  key: string;
  label: string;
  tagline: string;
  body: string;
  sim: string;
};

export const PIPELINE: PipelineStage[] = [
  {
    key: "target",
    label: "TARGET",
    tagline: "Defined, validated, allowlisted",
    body: "A target is submitted through the API or dashboard. Before anything runs, it is checked against safety controls — an allowlist of confirmed targets and validation rules.",
    sim: "Example target: 10.0.0.42 · confirmed · allowlist OK",
  },
  {
    key: "recon",
    label: "RECONNAISSANCE",
    tagline: "Host and service discovery",
    body: "Passive fingerprinting and discovery begin. The framework resolves the target and prepares a scope for enumeration.",
    sim: "Sim: 6 hosts · 42 open ports classified by service",
  },
  {
    key: "nmap",
    label: "PORT ENUMERATION",
    tagline: "Nmap scan engine",
    body: "Nmap is orchestrated for port discovery, service/version detection and safe script scanning. Results are parsed into the framework's own structured model.",
    sim: "Sim: 1,024 ports checked · 18 open · 5 services fingerprinted",
  },
  {
    key: "zap",
    label: "WEB SCANNING",
    tagline: "OWASP ZAP active scan",
    body: "For web targets, OWASP ZAP runs passive then active scans. Each alert is captured and normalized into the shared finding schema.",
    sim: "Sim: 46 ZAP alerts ingested · 31 deduplicated",
  },
  {
    key: "findings",
    label: "FINDING ENGINE",
    tagline: "Normalise, enrich, correlate",
    body: "Raw Nmap and ZAP output becomes one structured finding. The engine deduplicates, enriches with context, and correlates related evidence.",
    sim: "Sim: raw events 128 → findings 74",
  },
  {
    key: "severity",
    label: "SEVERITY CLASSIFICATION",
    tagline: "Risk-based triage",
    body: "Each finding is scored against rules — CVSS-style severity buckets from CRITICAL down to INFO, with supporting rationale.",
    sim: "Sim: 3 critical · 11 high · 22 medium · 26 low · 12 info",
  },
  {
    key: "database",
    label: "DATABASE",
    tagline: "SQLite persistence",
    body: "Scans, targets, findings, users, roles and every audited action are written to SQLite with referential integrity and audit logging.",
    sim: "Sim: schema 12 tables · audit rows 1,304",
  },
  {
    key: "reports",
    label: "REPORT GENERATION",
    tagline: "JSON + HTML deliverables",
    body: "Machine-readable JSON and a human-readable HTML report are generated per scan, served through the FastAPI dashboard.",
    sim: "Sim: reports rendered in < 900 ms each",
  },
];

export const DASHBOARD_SIM = {
  labels: ["SIMULATED DASHBOARD DATA"],
  scanStatus: "COMPLETED",
  target: "10.0.0.42",
  duration: "18m 42s",
  discoveredHosts: 6,
  openPorts: 18,
  critical: 3,
  high: 11,
  medium: 22,
  low: 26,
  info: 12,
  findings: [
    { sev: "CRITICAL", label: "Apache 2.4.49 path traversal", host: "10.0.0.42", port: "80/tcp" },
    { sev: "CRITICAL", label: "Default credentials on admin portal", host: "10.0.0.42", port: "443/tcp" },
    { sev: "CRITICAL", label: "RCE via exposed CGI (CVE-2021-41773)", host: "10.0.0.42", port: "80/tcp" },
    { sev: "HIGH", label: "Outdated OpenSSH (8.2p1)", host: "10.0.0.42", port: "22/tcp" },
    { sev: "HIGH", label: "TLS 1.0 enabled on web interface", host: "10.0.0.42", port: "443/tcp" },
    { sev: "HIGH", label: "Weak HSTS policy", host: "10.0.0.42", port: "443/tcp" },
    { sev: "MEDIUM", label: "Cookie missing Secure flag", host: "10.0.0.42", port: "443/tcp" },
    { sev: "MEDIUM", label: "Directory listing enabled", host: "10.0.0.42", port: "80/tcp" },
    { sev: "LOW", label: "Server header discloses version", host: "10.0.0.42", port: "80/tcp" },
  ],
  scanTimeline: [
    { m: "0:00", label: "TARGET VALIDATED" },
    { m: "0:30", label: "NMAP SYN SCAN" },
    { m: "2:10", label: "SERVICE DETECTION" },
    { m: "5:40", label: "ZAP PASSIVE SCAN" },
    { m: "9:12", label: "ZAP ACTIVE SCAN" },
    { m: "15:20", label: "FINDING ENGINE" },
    { m: "17:45", label: "REPORTS GENERATED" },
  ],
  events: [
    { t: "18:42:11", lvl: "INFO", msg: "scan completed · report artifacts written" },
    { t: "18:39:02", lvl: "WARN", msg: "active scan throttled below rate limit" },
    { t: "18:21:44", lvl: "INFO", msg: "finding engine normalised 128 raw events" },
    { t: "18:05:31", lvl: "CRIT", msg: "3 findings classified CRITICAL" },
    { t: "17:59:03", lvl: "INFO", msg: "ZAP active scan started on 10.0.0.42" },
    { t: "17:30:10", lvl: "INFO", msg: "Nmap service detection complete" },
  ],
};

export const CASE_STUDY = {
  id: "CASE-STUDY // 001",
  sections: [
    { id: "problem", code: "01", title: "THE PROBLEM", body: "Manual penetration testing workflows are slow, inconsistent and full of copy-paste: run a scanner, read raw output, memorize results, hand-type a report. Findings get lost, evidence goes stale, and try/finally cleanup is easy to skip. I wanted a tool that behaves like a small security pipeline instead of a notebook." },
    { id: "idea", code: "02", title: "THE IDEA", body: "Build a framework that owns the entire lifecycle: accept a target → validate it against safety controls → orchestrate Nmap and OWASP ZAP → normalise everything into one finding model → classify severity → persist to SQLite → emit machine-readable and human-readable reports through an authenticated FastAPI dashboard." },
    { id: "architecture", code: "03", title: "ARCHITECTURE", body: "Layered Python application: request layer (FastAPI routes), orchestration layer (scan manager), execution layer (Nmap / ZAP adapters), analysis layer (finding engine + severity classifier), persistence layer (SQLite via a repository pattern), and a reporting layer (JSON + HTML renderers). Each layer talks to the next through typed interfaces so the whole pipeline is testable." },
    { id: "attack-surface", code: "04", title: "ATTACK SURFACE", body: "The framework inspects hosts, ports, services and web endpoints — the surface a real attacker sees. Nmap covers network-layer exposure; OWASP ZAP covers application-layer weaknesses. Both feed one unified evidence set instead of two disconnected reports." },
    { id: "detection", code: "05", title: "DETECTION", body: "Findings are normalised from scanner-specific formats into a shared schema. The finding engine deduplicates overlapping alerts, attaches context (host, port, evidence), and flags items that need manual verification before they can be considered confirmed." },
    { id: "findings", code: "06", title: "FINDINGS", body: "Each finding is classified by severity using a rules engine: CVSS-style buckets from CRITICAL to INFO, each with a rationale. The dashboard renders the distribution, and reports carry the full evidence trail for remediation." },
    { id: "controls", code: "07", title: "SECURITY CONTROLS", body: "Built-in safety and governance, not bolted on: allowlist-based target validation, rate-limited scans, authentication on the API, role-based access control (RBAC), and an audit log recording every action — who ran which scan, when, and on what." },
    { id: "results", code: "08", title: "RESULTS", body: "The framework turns an endpoint (or CIDR scope) into one deterministic, navigable result set: a severity distribution, a findings table, an evidence-backed scan timeline, and two report formats ready to hand off. Automated tests protect the pipeline so changes stay safe." },
    { id: "what-i-learned", code: "09", title: "WHAT I LEARNED", body: "Orchestration is where tooling gets hard — wrapping two scanners cleanly teaches you more about parsing, state and error handling than any single scanner. Safety controls taught me to treat 'safe defaults' as a product requirement. And logging every action made me think like an auditor, which is exactly how a security engineer should think." },
  ],
  pipelineDiagram: [
    { id: "in", label: "TARGET", note: "API / DASHBOARD" },
    { id: "guard", label: "SAFETY GATE", note: "ALLOWLIST · VALIDATE" },
    { id: "nmap", label: "NMAP", note: "RECON · PORTS · SERVICES" },
    { id: "zap", label: "OWASP ZAP", note: "PASSIVE + ACTIVE" },
    { id: "engine", label: "FINDING ENGINE", note: "NORMALISE · DEDUP" },
    { id: "class", label: "SEVERITY CLASSIFIER", note: "CRIT → INFO" },
    { id: "db", label: "SQLITE", note: "FINDINGS · AUDIT" },
    { id: "out", label: "REPORTS", note: "JSON + HTML" },
  ],
};

/* ── INTELLIGENCE ─────────────────────────── */

export const INTELLIGENCE = {
  sim: "ALL DATA BELOW IS SIMULATED DEMO TELEMETRY",
  tiles: [
    { key: "SYSTEM STATUS", value: "OPERATIONAL", tone: "ok" },
    { key: "NETWORK STATUS", value: "NOMINAL", tone: "ok" },
    { key: "THREAT LEVEL", value: "LOW", tone: "warn" },
    { key: "ACTIVE SCANS", value: "0", tone: "accent" },
    { key: "SECURITY EVENTS", value: "1,204", tone: "accent" },
  ] as { key: string; value: string; tone: "ok" | "warn" | "accent" }[],
  telemetry: [
    { t: "UTS", label: "uptime", value: "00:00:00" },
    { t: "AVG", label: "response", value: "12ms" },
    { t: "PRC", label: "processes", value: "38" },
    { t: "MEM", label: "memory", value: "41%" },
    { t: "NIC", label: "interfaces", value: "3" },
    { t: "CRT", label: "certificate", value: "VALID" },
  ],
  eventLog: [
    { t: "00:01:22", sev: "INFO", msg: "Operator session authenticated (MFA OK)" },
    { t: "00:04:11", sev: "INFO", msg: "Scan pipeline idle — no targets queued" },
    { t: "00:08:47", sev: "WARN", msg: "Port scan rate approached soft cap" },
    { t: "00:11:30", sev: "INFO", msg: "Report archive rotated (31 days)" },
    { t: "00:14:09", sev: "INFO", msg: "Audit log flushed to disk" },
    { t: "00:17:58", sev: "WARN", msg: "Intercepted repeat auth attempt — flagged" },
    { t: "00:21:03", sev: "INFO", msg: "Threat feed heartbeat — nominal" },
    { t: "00:24:44", sev: "INFO", msg: "Nightly integrity check PASSED" },
  ],
};

/* ── LOGS (achievements) ──────────────────── */

export const ACHIEVEMENTS = [
  {
    state: "VERIFIED",
    tone: "ok" as const,
    title: "AUTOMATED PENTESTING FRAMEWORK",
    desc: "A complete, working security automation project — scanning, findings engine, severity classification, SQLite persistence, auth, RBAC, audit logging, reports and dashboard.",
  },
  {
    state: "VERIFIED",
    tone: "ok" as const,
    title: "PORTFOLIO — CYBER OPERATIONS",
    desc: "This site: a full frontend build (Next.js, TypeScript, Tailwind, Framer Motion) engineered as a cyber operations interface.",
  },
  {
    state: "ACTIVE",
    tone: "accent" as const,
    title: "SECURITY LEARNING TRACK",
    desc: "Continuous study across SOC / blue team, VAPT and security automation — documented as I go.",
  },
  {
    state: "BUILDING",
    tone: "warn" as const,
    title: "PROFESSIONAL EXPERIENCE",
    desc: "Targeting internships in cybersecurity — actively looking for the first real ops seat.",
  },
];

export const CERTIFICATIONS: { name: string; issuer: string; state: "PLACEHOLDER" }[] = [
  {
    name: "ADD CERTIFICATION NAME HERE",
    issuer: "Add issuer — e.g. CompTIA / TryHackMe / Coursera",
    state: "PLACEHOLDER",
  },
];

/* ── CREDENTIALS (resume) ─────────────────── */

export type ResumeItem = {
  head: string;
  sub: string;
  note?: string;
};

export const RESUME_SECTIONS: {
  code: string;
  title: string;
  items: ResumeItem[];
}[] = [
  {
    code: "EDU",
    title: "EDUCATION",
    items: [
      {
        head: "BACHELOR'S DEGREE — CYBERSECURITY",
        sub: "In progress · full-time student",
        note: "Focused on offensive and defensive security fundamentals.",
      },
    ],
  },
  {
    code: "SKL",
    title: "SKILLS",
    items: [
      { head: "LANGS & WEB", sub: "Python, FastAPI, SQLite, REST APIs, Bash, TypeScript (building)" },
      { head: "SECURITY TOOLING", sub: "Nmap, OWASP ZAP, Burp Suite, VAPT methodology" },
      { head: "PLATFORMS", sub: "Linux / Kali Linux, Docker, Git/GitHub" },
      { head: "LEARNING", sub: "Kubernetes, Jenkins, Terraform, Prometheus, Grafana, ELK, Vault" },
    ],
  },
  {
    code: "PRJ",
    title: "PROJECTS",
    items: [
      {
        head: "AUTOMATED PENETRATION TESTING FRAMEWORK",
        sub: "Nmap + OWASP ZAP orchestration · finding engine · severity classifier · SQLite · auth, RBAC, audit logging · JSON/HTML reports · FastAPI dashboard · automated tests",
      },
    ],
  },
  {
    code: "EXP",
    title: "EXPERIENCE",
    items: [
      {
        head: "EQUIVALENT HANDS-ON EXPERIENCE",
        sub: "Applied through coursework and self-directed projects, not yet paid employment.",
        note: "Seeking first internship — SOC, VAPT or security tooling.",
      },
    ],
  },
];

/* ── CONTACT ──────────────────────────────── */

export const CONTACT = {
  headline: "SECURE CHANNEL // OPEN",
  pitch:
    "Looking for an opportunity to learn, build, and solve real security problems.",
  channels: [
    { id: "email", label: "EMAIL", value: "your.email@example.com", kind: "link", hint: "PLACEHOLDER — replace with real address" },
    { id: "github", label: "GITHUB", value: "github.com/YOUR-HANDLE", kind: "link", hint: "PLACEHOLDER — replace with real handle" },
    { id: "linkedin", label: "LINKEDIN", value: "linkedin.com/in/YOUR-PROFILE", kind: "link", hint: "PLACEHOLDER — replace with real profile" },
  ],
};

/* ── EASTER EGGS ──────────────────────────── */

export const SECRETS = {
  konami: "OPERATOR MODE UNLOCKED — CLEARANCE: TRAINEE. Nice moves, operator. Some of us prefer the keyboard.",
  sudoAccess: [
    "ACCESS DENIED: privilage escalation not available for trainee clearance.",
    "Nice try. This interface is read-only for visitors.",
    "Actually… you're already inside. Welcome.",
  ],
  statusClicks: [
    "You clicked me.",
    "Still here?",
    "Persistent operator.",
    "Almost…",
    "SYSTEM AUDIT UNLOCKED — try the terminal: sudo portfolio --deep-scan",
  ],
  deepScanLines: [
    "INITIATING DEEP SYSTEM AUDIT…",
    "SCANNING PORTFOLIO INTEGRITY…",
    "COMPILING COMPONENT MANIFEST…",
    "AWS-LEVEL DESIGN [PENDING REVIEW]",
    "AUTHENTICITY: HIGH",
    "GENERIC-TEMPLATE DETECTION: NONE",
    "IMPOSTOR-SYNDROME-BLOCKER: ENGAGED",
    "AUDIT COMPLETE // STATUS: CLEARANCE TRAINEE — READY TO GROW",
  ],
};

export const TERMINAL_BANNER = `
┌──────────────────────────────────────────┐
│  PRATIMA // CYBER OPERATIONS  —  CMD-01    │
│  type 'help' to list available commands   │
└──────────────────────────────────────────┘`;

export type TermOutput = { text: string; tone?: "dim" | "accent" | "warn" | "ok" | "crit" };

export const TERMINAL_HELP: TermOutput[] = [
  { text: "AVAILABLE COMMANDS", tone: "accent" },
  { text: "  help                     — show this list" },
  { text: "  whoami                   — identify operator" },
  { text: "  skills                   — list arsenal groups" },
  { text: "  projects                 — list operational projects" },
  { text: "  contact                  — secure channels" },
  { text: "  ls /projects             — project files" },
  { text: "  cat /about               — identity dossier" },
  { text: "  scan portfolio           — run a portfolio scan" },
  { text: "  nmap --portfolio         — detailed scan" },
  { text: "  sudo portfolio --deep-scan — full system audit", tone: "warn" },
  { text: "  clear                    — clear the terminal" },
];
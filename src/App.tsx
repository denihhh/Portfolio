import { memo, useMemo } from "react";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";

/* ─────────────────────────────────────────────
   Type Definitions
   ───────────────────────────────────────────── */

interface Capability {
  readonly label: string;
}

interface CapabilityCategory {
  readonly title: string;
  readonly items: readonly Capability[];
}

interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: React.ReactNode;
}

/* ─────────────────────────────────────────────
   Static Data
   ───────────────────────────────────────────── */

const CAPABILITIES: readonly CapabilityCategory[] = [
  {
    title: "Systems & Backend",
    items: [
      { label: "Rust" },
      { label: "Java" },
      { label: "Python" },
      { label: "Laravel" },
      { label: "Node.js" },
    ],
  },
  {
    title: "Network & Security",
    items: [
      { label: "Routing & Switching" },
      { label: "Enterprise Security" },
      { label: "RBAC" },
      { label: "IDOR Mitigation" },
      { label: "Wireshark" },
    ],
  },
  {
    title: "Frontend & Mobile",
    items: [
      { label: "TypeScript" },
      { label: "React" },
      { label: "Tailwind CSS" },
      { label: "Flutter" },
      { label: "Dart" },
      { label: "Firebase" },
    ],
  },
] as const;

const NAV_ITEMS = [
  { label: "Intro", href: "#intro" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

/* ─────────────────────────────────────────────
   SVG Icon Components
   ───────────────────────────────────────────── */

const GitHubIcon = memo(function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
});

const LinkedInIcon = memo(function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
});

const MailIcon = memo(function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
});

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/denihhh",
    icon: <GitHubIcon />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/danish-haikal-mohammad-06a4a1253/",
    icon: <LinkedInIcon />,
  },
  {
    label: "Email",
    href: "mailto:haikaldanish0306@gmail.com",
    icon: <MailIcon />,
  },
];

/* ─────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────── */

const StatusBadge = memo(function StatusBadge() {
  return (
    <div className="inline-flex items-center gap-2 border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5">
      <span className="animate-pulse-slow h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
      <span className="font-mono text-xs tracking-wide text-emerald-400">
        Seeking for job opportunity (Full-time)
      </span>
    </div>
  );
});

const CredentialBadge = memo<{ text: string }>(function CredentialBadge({ text }) {
  return (
    <span className="border border-slate-700 bg-slate-900/60 px-2.5 py-1 font-mono text-xs text-slate-300">
      {text}
    </span>
  );
});

const CapabilityCard = memo<{ category: CapabilityCategory }>(function CapabilityCard({
  category,
}) {
  return (
    <div className="group border border-slate-800 bg-slate-950/50 p-5 transition-all duration-300 hover:border-emerald-400/20 hover:bg-slate-900/30">
      <h3 className="mb-4 font-mono text-xs font-medium tracking-widest text-emerald-400 uppercase">
        {category.title}
      </h3>
      <div className="flex flex-wrap gap-2" role="list">
        {category.items.map((item) => (
          <span
            key={item.label}
            role="listitem"
            className="border border-slate-700/60 px-2.5 py-1 font-mono text-xs text-slate-300 transition-colors duration-200 hover:border-emerald-400/40 hover:text-emerald-400"
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
});

const SectionHeader = memo<{ id: string; title: string }>(function SectionHeader({ id, title }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <h2
        id={id}
        className="font-mono text-xs font-medium tracking-widest text-emerald-400 uppercase"
      >
        {title}
      </h2>
      <div className="h-px flex-1 bg-slate-800" aria-hidden="true" />
    </div>
  );
});

const Timeline = memo(function Timeline() {
  return (
    <div className="mt-8 max-w-xl">
      <div className="relative border-l border-slate-800/80 pl-6 ml-2 space-y-6">
        {/* Timeline Item: Bachelor */}
        <div className="relative group">
          {/* Dot indicator */}
          <div className="absolute -left-[31px] top-1.5 h-2 w-2 rounded-full border border-slate-700 bg-slate-950 transition-colors duration-300 group-hover:border-emerald-400/80 group-hover:bg-emerald-400/10" aria-hidden="true" />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h4 className="font-mono text-xs font-semibold text-slate-200">
              Bachelor in Computer Science (Hons.)
            </h4>
            <span className="font-mono text-[10px] text-slate-500">Graduating 2026</span>
          </div>
          <p className="mt-1 font-mono text-[11px] text-slate-400">
            International Islamic University Malaysia (IIUM) <span className="text-slate-700">&bull;</span> <span className="text-emerald-400/90 font-medium">3.61 CGPA</span>
          </p>
        </div>

        {/* Timeline Item: Intern */}
        <div className="relative group">
          {/* Dot indicator (active) */}
          <div className="absolute -left-[31px] top-1.5 h-2 w-2 rounded-full border border-emerald-400 bg-emerald-400 ring-4 ring-emerald-400/15 animate-pulse-slow" aria-hidden="true" />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h4 className="font-mono text-xs font-semibold text-slate-200">
              Web Developer Intern
            </h4>
            <span className="font-mono text-[10px] text-emerald-400 font-medium">March 2026 - September 2026</span>
          </div>
          <p className="mt-1 font-mono text-[11px] text-slate-400">
            Mysoftcare Solution
          </p>
        </div>
      </div>
    </div>
  );
});

/* ─────────────────────────────────────────────
   Main App Component
   ───────────────────────────────────────────── */

function App() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-200">
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      {/* ─── Navigation ─── */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 px-4 py-3 sm:flex-row sm:justify-between sm:px-8">
          <span className="font-mono text-xs font-medium tracking-widest text-emerald-400/80">
            Danish Haikal
          </span>
          <ul className="flex items-center gap-4 sm:gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-mono text-[11px] text-slate-400 transition-colors duration-200 hover:text-emerald-400 sm:text-xs"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Content */}
      <main className="relative mx-auto max-w-4xl px-4 py-10 sm:px-8 sm:py-16 lg:py-24">

        {/* ═══════════════════════════════════════
           SECTION 01 — Intro
           ═══════════════════════════════════════ */}
        <section id="intro" className="animate-fade-in mb-14 scroll-mt-20 sm:mb-20 lg:mb-24 sm:scroll-mt-16">
          {/* Terminal-style identifier */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-emerald-400" aria-hidden="true" />
            <span className="font-mono text-xs tracking-widest text-emerald-400/80">
              01 // INTRO
            </span>
          </div>

          <div className="mt-2 mb-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
              Danish Haikal
            </h1>
            <p className="mt-3 font-mono text-sm tracking-wide text-emerald-400 sm:text-base">
              &gt; Software Developer &amp; Network Security
            </p>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Final year IIUM student in Computer Science with specialization in Network Security.
          </p>

          {/* Credentials */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <CredentialBadge text="CCNA Certified" />
            <CredentialBadge text="ISTQB Certified Tester Foundation Level (CTFL) Training" />
          </div>

          {/* Availability */}
          <div className="mt-5">
            <StatusBadge />
          </div>

          {/* Timeline */}
          <Timeline />

          {/* Social Links */}
          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group flex items-center gap-2 border border-slate-800 px-3 py-2 text-slate-400 transition-all duration-200 hover:border-emerald-400/40 hover:text-emerald-400"
              >
                {link.icon}
                <span className="font-mono text-xs">{link.label}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════
           SECTION 02 — About & Proficiency
           ═══════════════════════════════════════ */}
        <section
          id="about"
          className="animate-fade-in-delay-1 mb-14 scroll-mt-20 sm:mb-20 sm:scroll-mt-16 lg:mb-24"
          aria-labelledby="about-heading"
        >
          <SectionHeader id="about-heading" title="02 // About" />

          {/* About text */}
          <div className="mb-8 border-l-2 border-emerald-400/30 pl-5">
            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              I am an undergraduate student in International Islamic University Malaysia (IIUM),
              pursuing a degree in Computer Science with specialization in Network Security. I am passionate about building
              efficient and scalable software systems, with a particular interest in
              cloud computing and cybersecurity.
            </p>
          </div>

          {/* Capabilities Grid */}
          <h3 className="mb-4 font-mono text-xs tracking-wider text-slate-500">
            // Proficiency
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {CAPABILITIES.map((cat) => (
              <CapabilityCard key={cat.title} category={cat} />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════
           SECTION 03 — Projects
           ═══════════════════════════════════════ */}
        <section id="projects" className="mb-14 scroll-mt-20 sm:mb-20 sm:scroll-mt-16 lg:mb-24">
          <Projects />
        </section>

        {/* ═══════════════════════════════════════
           SECTION 04 — [Your Section]
           ═══════════════════════════════════════ */}
        <section
          id="contact"
          className="animate-fade-in-delay-3 mb-10 scroll-mt-20 sm:mb-16 sm:scroll-mt-16"
          aria-labelledby="contact-heading"
        >
          <SectionHeader id="contact-heading" title="04 // Contact" />

          <ContactForm />
        </section>

        {/* ─── Footer ─── */}
        <footer className="border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <p className="font-mono text-xs text-slate-500">
              &copy; {currentYear} &mdash; Danish Haikal Mohammad.
            </p>
            <p className="font-mono text-xs text-slate-600">
              // Built with React + TypeScript
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;

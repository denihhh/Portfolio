import { memo, useMemo, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Mail, 
  Shield, 
  Cpu, 
  Layers, 
  Award, 
  Terminal, 
  MapPin, 
  CheckCircle,
  Network
} from "lucide-react";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";

/* ─────────────────────────────────────────────
   SVG Brand Icons (Brand icons are not in Lucide-react v0.400+)
   ───────────────────────────────────────────── */

const GitHubIcon = memo(function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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

/* ─────────────────────────────────────────────
   Type Definitions
   ───────────────────────────────────────────── */

interface Capability {
  readonly label: string;
}

interface CapabilityCategory {
  readonly title: string;
  readonly icon: React.ReactNode;
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
    icon: <Cpu className="w-4 h-4 text-emerald-400" />,
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
    icon: <Shield className="w-4 h-4 text-emerald-400" />,
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
    icon: <Layers className="w-4 h-4 text-emerald-400" />,
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
    icon: <Mail className="w-4 h-4" />,
  },
];

/* ─────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────── */

const StatusBadge = memo(function StatusBadge() {
  return (
    <div className="inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 rounded-full backdrop-blur-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
      </span>
      <span className="font-mono text-[10px] sm:text-xs tracking-wider text-emerald-400 font-medium">
        Seeking for job opportunity (Full-time)
      </span>
    </div>
  );
});

const CredentialBadge = memo<{ text: string }>(function CredentialBadge({ text }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 hover:border-slate-700/80 transition-all px-3 py-1.5 rounded text-xs text-slate-300 font-mono">
      <Award className="w-3.5 h-3.5 text-emerald-400/80" />
      {text}
    </span>
  );
});

const CapabilityCard = memo<{ category: CapabilityCategory }>(function CapabilityCard({
  category,
}) {
  return (
    <div className="group relative glass-card p-6 rounded-lg overflow-hidden">
      <div className="absolute top-0 left-0 w-[2px] h-0 bg-emerald-400 transition-all duration-300 group-hover:h-full" />
      <div className="mb-4 flex items-center gap-2">
        {category.icon}
        <h3 className="font-mono text-xs font-semibold tracking-widest text-slate-200 uppercase">
          {category.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2" role="list">
        {category.items.map((item) => (
          <span
            key={item.label}
            role="listitem"
            className="border border-slate-800/80 bg-slate-900/20 hover:border-emerald-400/30 hover:text-emerald-400 hover:bg-emerald-500/5 px-2.5 py-1 rounded font-mono text-[11px] text-slate-400 transition-all duration-200"
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
    <div className="mb-8 flex items-center gap-3">
      <h2
        id={id}
        className="font-mono text-xs font-semibold tracking-widest text-emerald-400 uppercase"
      >
        {title}
      </h2>
      <div className="h-px flex-1 bg-slate-800/60" aria-hidden="true" />
    </div>
  );
});

const Timeline = memo(function Timeline() {
  return (
    <div className="mt-8 max-w-xl">
      <div className="relative border-l border-slate-800/80 pl-6 ml-2 space-y-8">
        {/* Timeline Item: Bachelor */}
        <div className="relative group">
          {/* Dot indicator */}
          <div className="absolute -left-[31px] top-1.5 h-2 w-2 rounded-full border border-slate-700 bg-slate-950 transition-all duration-300 group-hover:border-emerald-400 group-hover:bg-emerald-400/20 group-hover:scale-125" aria-hidden="true" />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h4 className="font-mono text-xs font-semibold text-slate-200">
              Bachelor in Computer Science (Hons.)
            </h4>
            <span className="font-mono text-[10px] text-slate-500 font-medium">Graduating 2026</span>
          </div>
          <p className="mt-1 font-mono text-[11px] text-slate-400">
            International Islamic University Malaysia (IIUM) <span className="text-slate-700">&bull;</span> <span className="text-emerald-400 font-medium">3.61 CGPA</span>
          </p>
        </div>

        {/* Timeline Item: Intern */}
        <div className="relative group">
          {/* Dot indicator (active) */}
          <div className="absolute -left-[31px] top-1.5 h-2 w-2 rounded-full border border-emerald-400 bg-emerald-400 ring-4 ring-emerald-400/10" aria-hidden="true" />
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

interface SkillDetail {
  name: string;
  level: number;
}

interface RadarTab {
  id: string;
  title: string;
  icon: React.ReactNode;
  focus: string;
  skills: SkillDetail[];
  useCase: string;
}

const RADAR_DATA: RadarTab[] = [
  {
    id: "backend",
    title: "Backend",
    icon: <Cpu className="w-3.5 h-3.5" />,
    focus: "Server-side logic & API architectures",
    useCase: "Building resilient and secure backend services with PHP, Laravel, Rust, and Java.",
    skills: [
      { name: "PHP & Laravel", level: 85 },
      { name: "Rust", level: 55 },
      { name: "Java & Node.js", level: 70 },
      { name: "Python", level: 60 },
    ],
  },
  {
    id: "security",
    title: "Network & Security",
    icon: <Shield className="w-3.5 h-3.5" />,
    focus: "Infrastructure security & routing",
    useCase: "Configuring enterprise switching, packet diagnostics, and access controls.",
    skills: [
      { name: "Routing & Switching", level: 90 },
      { name: "Enterprise Security", level: 80 },
      { name: "Wireshark Diagnostics", level: 65 },
      { name: "IDOR/RBAC Mitigations", level: 80 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend & Mobile",
    icon: <Layers className="w-3.5 h-3.5" />,
    focus: "Interactive interfaces & client state",
    useCase: "Delivering responsive user interfaces and cross-platform designs.",
    skills: [
      { name: "React", level: 65 },
      { name: "TypeScript", level: 70 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Livewire", level: 85 },
    ],
  },
];

const SkillRadar = memo(function SkillRadar() {
  const [activeTab, setActiveTab] = useState("security"); // default to Network Security since it's the specialty

  const currentTab = useMemo(() => {
    return RADAR_DATA.find((tab) => tab.id === activeTab) || RADAR_DATA[1];
  }, [activeTab]);

  return (
    <div className="glass-panel p-5 rounded-lg border border-slate-900/60 shadow-xl relative overflow-hidden flex flex-col justify-between h-full min-h-[340px]">
      {/* Decorative glows */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />

      <div>
        <h3 className="font-mono text-[9px] tracking-wider text-slate-500 font-semibold mb-3 uppercase flex items-center justify-between">
          
          <span className="text-emerald-400 font-medium animate-pulse">● CURRENT_SKILLS_EXP</span>
        </h3>

        {/* Tab triggers */}
        <div className="flex gap-1.5 border-b border-white/5 pb-3 mb-4 overflow-x-auto scrollbar-none">
          {RADAR_DATA.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-wide transition-all border shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-semibold"
                  : "bg-slate-950/40 border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.icon}
              <span>{tab.title.split(" & ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Focus information */}
        <div className="space-y-3.5">
          <div>
            <span className="font-mono text-[9px] tracking-wider text-slate-500 block uppercase mb-1">
              FOCUS AREA
            </span>
            <p className="text-xs font-semibold text-slate-200">
              {currentTab.focus}
            </p>
          </div>

          {/* Skill Bars */}
          <div className="space-y-2.5">
            <span className="font-mono text-[9px] tracking-wider text-slate-500 block uppercase">
              PROFICIENCY FOCUS
            </span>
            <div className="space-y-2">
              {currentTab.skills.map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-300">{skill.name}</span>
                    <span className="text-emerald-400/80">{skill.level}%</span>
                  </div>
                  {/* Progress track */}
                  <div className="h-1 bg-slate-950/80 rounded-full overflow-hidden border border-white/5 relative">
                    <motion.div
                      key={`${activeTab}-${skill.name}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description Box */}
      <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-slate-400 leading-relaxed font-mono">
        <span className="text-emerald-400/80">&gt; </span>
        {currentTab.useCase}
      </div>
    </div>
  );
});

/* ─────────────────────────────────────────────
   Main App Component
   ───────────────────────────────────────────── */

function App() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  
  // Track mouse coordinates for premium spotlight overlay
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Framer Motion Scroll tracker
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div 
      className="relative min-h-screen bg-[#030712] text-slate-200 overflow-hidden"
      style={{
        "--mouse-x": `${mouseCoords.x}px`,
        "--mouse-y": `${mouseCoords.y}px`,
      } as React.CSSProperties}
    >
      {/* Scroll indicator bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-emerald-400 origin-[0%] z-[60]" style={{ scaleX }} />

      {/* Decorative glows & grid */}
      <div className="spotlight-bg" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
      <div className="ambient-glow-1" aria-hidden="true" />
      <div className="ambient-glow-2" aria-hidden="true" />

      {/* ─── Navigation ─── */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg">
        <div className="flex items-center justify-between rounded-full border border-white/5 bg-slate-950/60 px-6 py-2.5 backdrop-blur-md shadow-lg shadow-black/25">
          <a href="#intro" className="font-mono text-xs font-bold tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors">
            DH
          </a>
          <ul className="flex items-center gap-5 sm:gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-mono text-[10px] sm:text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Content */}
      <main className="relative mx-auto max-w-4xl px-6 py-24 sm:px-8 sm:py-32 lg:py-40">

        {/* ═══════════════════════════════════════
           SECTION 01 — Intro
           ═══════════════════════════════════════ */}
        <motion.section 
          id="intro" 
          className="mb-20 scroll-mt-24 sm:mb-28 lg:mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Section Marker */}
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-emerald-500" aria-hidden="true" />
            <span className="font-mono text-xs tracking-widest text-emerald-400 font-semibold">
              01 // INTRO
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Intro Text info */}
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-3">
                <StatusBadge />
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Danish Haikal
                </h1>
                <p className="font-mono text-sm sm:text-base text-emerald-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Software Developer &amp; Network Security
                </p>
              </div>
              
              <p className="max-w-xl text-sm sm:text-base leading-relaxed text-slate-400">
                Final year Computer Science student at IIUM specializing in Network Security. 
                Passionate about designing secure software architectures, cloud networks, and low-latency infrastructure.
              </p>

              {/* Credentials */}
              <div className="flex flex-wrap gap-2.5">
                <CredentialBadge text="CCNA Certified" />
                <CredentialBadge text="ISTQB CTFL Training" />
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="group inline-flex items-center justify-center gap-2 rounded border border-slate-800 bg-slate-900/30 px-3.5 py-2 text-slate-400 transition-all duration-300 hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/5 hover:-translate-y-0.5"
                  >
                    {link.icon}
                    <span className="font-mono text-xs">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Interactive Skill Radar Map */}
            <div className="md:col-span-5">
              <SkillRadar />
            </div>
          </div>

          {/* Education & Internship Timeline */}
          <div className="mt-12 pt-8 border-t border-slate-900">
            <h3 className="font-mono text-xs font-semibold tracking-widest text-slate-500 uppercase flex items-center gap-2">
              <Network className="w-3.5 h-3.5" />
              Timeline &amp; Career Nodes
            </h3>
            <Timeline />
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════
           SECTION 02 — About & Proficiency
           ═══════════════════════════════════════ */}
        <motion.section
          id="about"
          className="mb-20 scroll-mt-24 sm:mb-28 lg:mb-32"
          aria-labelledby="about-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader id="about-heading" title="02 // About" />

          <div className="mb-10 space-y-6">
            <div className="border-l-2 border-emerald-500/40 pl-5">
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                I am an undergraduate student in International Islamic University Malaysia (IIUM),
                pursuing a degree in Computer Science with specialization in Network Security. I am passionate about building
                efficient, secure, and scalable software systems, with a deep interest in
                systems-level architecture, threat modeling, and robust cloud configurations.
              </p>
            </div>
          </div>

          {/* Proficiency Grid */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-semibold tracking-wider text-slate-500 uppercase">
              // Core Proficiencies
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map((cat) => (
                <CapabilityCard key={cat.title} category={cat} />
              ))}
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════
           SECTION 03 — Projects
           ═══════════════════════════════════════ */}
        <motion.section 
          id="projects" 
          className="mb-20 scroll-mt-24 sm:mb-28 lg:mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Projects />
        </motion.section>

        {/* ═══════════════════════════════════════
           SECTION 04 — Contact
           ═══════════════════════════════════════ */}
        <motion.section
          id="contact"
          className="mb-12 scroll-mt-24"
          aria-labelledby="contact-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader id="contact-heading" title="04 // Contact" />

          {/* Wrapper layout for contact */}
          <div className="glass-panel p-6 sm:p-8 rounded-lg">
            <ContactForm />
          </div>
        </motion.section>

        {/* ─── Footer ─── */}
        <footer className="mt-16 pt-8 border-t border-slate-900/60">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="font-mono text-[10px] sm:text-xs text-slate-500 flex items-center gap-1.5">
              &copy; {currentYear} &mdash; Danish Haikal Mohammad. 
              All Rights Reserved.
            </p>
            <p className="font-mono text-[10px] sm:text-xs text-slate-600 flex items-center gap-1.5">
              
              || Built with React + TS + Tailwind
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;

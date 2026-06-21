import { memo } from "react";
import { motion } from "framer-motion";
import { Terminal, Code2, ArrowUpRight } from "lucide-react";

// Import project screenshots
import lightjoyImg from "../assets/lightjoy.png";
import collabquestImg from "../assets/collabquest.png";
import pointcareImg from "../assets/pointcare.png";

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

interface ProjectHighlight {
  readonly text: string;
}

interface ProjectTag {
  readonly label: string;
}

interface Project {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly subtitle: string;
  readonly tags: readonly ProjectTag[];
  readonly highlights: readonly ProjectHighlight[];
  readonly repoUrl?: string;
  readonly liveUrl?: string;
  readonly image: string;
}

const PROJECTS: readonly Project[] = [
  {
    id: "lightjoy",
    index: "01",
    title: "LightJoy",
    subtitle: "Web-Based Cloud Gaming Platform",
    tags: [
      { label: "Rust" },
      { label: "TypeScript" },
      { label: "Moonlight/Sunshine" },
      { label: "WebRTC" },
    ],
    highlights: [
      { text: "My final year project (FYP)" },
      { text: "Engineered a web-based cloud gaming platform" },
    ],
    repoUrl: "https://github.com/Zefeyr/LightJoy",
    image: lightjoyImg,
  },
  {
    id: "collabquest",
    index: "02",
    title: "CollabQuest",
    subtitle: "Group Project Monitoring Platform",
    tags: [
      { label: "Flutter" },
      { label: "Dart" },
      { label: "Firebase" },
    ],
    highlights: [
      { text: "Collabed with my groupmate for a uni group project" },
      { text: "Developed a project monitoring platform for group projects" },
    ],
    repoUrl: "https://github.com/Zefeyr/Group-Project-Monitoring-Mobile-App",
    image: collabquestImg,
  },
  {
    id: "pointcare",
    index: "03",
    title: "PointCare",
    subtitle: "Smart Clinic Appointment Booking System",
    tags: [
      { label: "Laravel" },
      { label: "Livewire" },
      { label: "Tailwind CSS" },
      { label: "PHP" },
    ],
    highlights: [
      { text: "My internship project" },
      { text: "Developed a smart clinic appointment booking system" },
    ],
    repoUrl: "https://github.com/denihhh/Pointcare",
    image: pointcareImg,
  },
] as const;

// Stagger variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as any, // premium out-expo ease
    },
  },
};

const ProjectCard = memo<{ project: Project }>(function ProjectCard({
  project,
}) {
  return (
    <motion.article
      variants={itemVariants}
      className="group relative glass-card rounded-lg flex flex-col justify-between h-full border border-slate-900/60 overflow-hidden"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Dynamic light accent top and bottom */}
      <div className="absolute top-0 left-0 w-8 h-[1px] bg-emerald-500/40 transition-all duration-300 group-hover:w-full group-hover:bg-emerald-400 z-10" />
      <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-emerald-500/40 transition-all duration-300 group-hover:w-full group-hover:bg-emerald-400 z-10" />

      <div>
        {/* Full-bleed Screenshot Preview */}
        {project.image && (
          <div className="relative aspect-video overflow-hidden bg-slate-950/60 border-b border-slate-900/60 flex items-center justify-center">
            {/* Blurred ambient background mirror for aspect ratio fitting */}
            <img
              src={project.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-md opacity-25 scale-110 pointer-events-none"
              aria-hidden="true"
            />
            {/* Clear foreground image */}
            <img
              src={project.image}
              alt={`${project.title} Preview`}
              className="relative z-10 h-full w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none z-20" />
          </div>
        )}

        {/* Header and tags container */}
        <div className="p-5 sm:p-6 pb-0">
          <header className="mb-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-wider text-slate-500 font-semibold">
                INDEX: {project.index}
              </span>
              <div className="flex items-center gap-2">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all"
                    aria-label="View Repository"
                  >
                    <GitHubIcon />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all"
                    aria-label="View Live Project"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
            <h3
              id={`project-title-${project.id}`}
              className="mt-2 font-mono text-base font-semibold text-slate-100 flex items-center gap-2 group-hover:text-emerald-300 transition-colors"
            >
              <Code2 className="w-4 h-4 text-emerald-500/80" />
              {project.title}
            </h3>
            <p className="mt-1.5 text-xs text-slate-400 font-medium">{project.subtitle}</p>
          </header>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-1.5" role="list" aria-label="Technologies">
            {project.tags.map((tag) => (
              <span
                key={tag.label}
                role="listitem"
                className="border border-slate-900 bg-slate-950/40 px-2 py-0.5 rounded font-mono text-[10px] text-slate-400 transition-colors duration-200 hover:border-emerald-400/20 hover:text-emerald-400"
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights container */}
      <div className="p-5 pb-5 sm:p-6 sm:pb-6 pt-0 mt-auto">
        <div className="border-t border-slate-900/60 ">
          <ul className="space-y-2.5" aria-label="Key highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight.text} className="flex items-start gap-2 text-xs leading-relaxed text-slate-300">
                <Terminal className="mt-0.5 w-3.5 h-3.5 shrink-0 text-emerald-400/80" aria-hidden="true" />
                <span>{highlight.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
});

const Projects = memo(function Projects() {
  return (
    <div aria-labelledby="projects-heading">
      {/* Section header */}
      <div className="mb-8 flex items-center gap-3">
        <h2
          id="projects-heading"
          className="font-mono text-xs font-semibold tracking-widest text-emerald-400 uppercase"
        >
          03 // Projects
        </h2>
        <div className="h-px flex-1 bg-slate-800/60" aria-hidden="true" />
      </div>

      {/* Project grid with Framer Motion Stagger */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECTS.map((project) => (
          <div key={project.id} className="h-full">
            <ProjectCard project={project} />
          </div>
        ))}
      </motion.div>
    </div>
  );
});

export default Projects;

import { memo } from "react";

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
}

const PROJECTS: readonly Project[] = [
  {
    id: "lightjoy",
    index: "01",
    title: "LightJoy",
    subtitle: "Web-Based Cloud Gaming Architecture",
    tags: [
      { label: "Rust" },
      { label: "TypeScript" },
      { label: "Moonlight/Sunshine" },
      { label: "WebRTC" },
    ],
    highlights: [
      { text: "Implemented strict RBAC for session allocation" },
      { text: "Designed a custom, low-overhead chat overlay" },
    ],
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
      { text: "Engineered IDOR mitigation layers" },
      { text: "Implemented state-based soft deletes for data integrity" },
    ],
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
      { text: "Built real-time appointment scheduling to reduce patient wait times" },
      { text: "Developed role-based dashboards for patients and clinic staff" },
    ],
  },
] as const;

const ProjectCard = memo<{ project: Project }>(function ProjectCard({
  project,
}) {
  return (
    <article
      className="group relative border border-slate-800 bg-slate-950/50 p-4 transition-all duration-300 hover:border-emerald-400/30 hover:bg-slate-900/40 sm:p-6"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Corner accent */}
      <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-emerald-400/40 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-emerald-400" />
      <div className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-emerald-400/40 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:border-emerald-400" />

      {/* Header */}
      <header className="mb-4">
        <span className="font-mono text-xs tracking-wider text-emerald-400/60">
          {project.index}
        </span>
        <h3
          id={`project-title-${project.id}`}
          className="mt-1 font-mono text-lg font-medium text-slate-100"
        >
          <span className="text-slate-500">// </span>
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-slate-400">{project.subtitle}</p>
      </header>

      {/* Tags */}
      <div className="mb-5 flex flex-wrap gap-2" role="list" aria-label="Technologies">
        {project.tags.map((tag) => (
          <span
            key={tag.label}
            role="listitem"
            className="border border-slate-700 bg-slate-900/60 px-2.5 py-0.5 font-mono text-xs text-slate-300 transition-colors duration-200 hover:border-emerald-400/40 hover:text-emerald-400"
          >
            {tag.label}
          </span>
        ))}
      </div>

      {/* Highlights */}
      <ul className="space-y-2.5" aria-label="Key highlights">
        {project.highlights.map((highlight) => (
          <li key={highlight.text} className="flex items-start gap-2.5 text-sm">
            <span
              className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-emerald-400/70"
              aria-hidden="true"
            />
            <span className="text-slate-300">{highlight.text}</span>
          </li>
        ))}
      </ul>
    </article>
  );
});

const Projects = memo(function Projects() {
  return (
    <div className="animate-fade-in-delay-2" aria-labelledby="projects-heading">
      {/* Section header */}
      <div className="mb-6 flex items-center gap-3">
        <h2
          id="projects-heading"
          className="font-mono text-xs font-medium tracking-widest text-emerald-400 uppercase"
        >
          03 // Projects
        </h2>
        <div className="h-px flex-1 bg-slate-800" aria-hidden="true" />
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
});

export default Projects;

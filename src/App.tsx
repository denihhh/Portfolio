import { memo, useMemo, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Mail,
  Shield,
  Cpu,
  Layers,
  Award,
  Terminal,
  Network
} from "lucide-react";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";
import LinuxIcon from "./assets/tech icon/Linux.svg";
import AutopsyIcon from "./assets/tech icon/Autopsy_Digital_Forensics_Logo.svg";
import DBeaverIcon from "./assets/tech icon/DBeaver.svg";
import LivewireIcon from "./assets/tech icon/Livewire.svg";

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
   Tech Brand Icons & Infinite Marquee
   ───────────────────────────────────────────── */

const PHPLogo = memo(() => (
  <svg className="w-13 h-13 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
    <ellipse cx="12" cy="12" rx="10" ry="6" />
    <text x="6.5" y="15" fill="#030712" fontSize="8" fontWeight="bold" fontFamily="monospace">PHP</text>
  </svg>
));

const LaravelLogo = memo(() => (
  <svg className="w-13 h-13 text-red-500" viewBox="0 0 128 133" fill="none">
    <path
      fill="currentColor"
      d="M 26.027344 0.136719 C 25.824219 0.214844 20.085938 3.484375 13.28125 7.394531 C 5.035156 12.136719 0.800781 14.632812 0.574219 14.867188 C 0.394531 15.070312 0.191406 15.421875 0.128906 15.644531 C -0.0429688 16.21875 -0.0546875 100.347656 0.117188 100.953125 C 0.179688 101.1875 0.382812 101.53125 0.566406 101.722656 C 1.011719 102.191406 50.238281 130.496094 50.835938 130.632812 C 51.113281 130.699219 51.425781 130.6875 51.734375 130.601562 C 52.40625 130.433594 101.503906 102.191406 101.941406 101.730469 C 102.121094 101.53125 102.324219 101.1875 102.390625 100.953125 C 102.476562 100.675781 102.507812 96.277344 102.507812 87.015625 L 102.507812 73.480469 L 114.476562 66.605469 C 125.761719 60.117188 126.453125 59.710938 126.742188 59.265625 L 127.039062 58.785156 L 127.039062 44.207031 C 127.039062 28.335938 127.070312 29.230469 126.441406 28.65625 C 126.273438 28.507812 120.523438 25.152344 113.652344 21.195312 L 101.171875 14.015625 L 99.785156 14.015625 L 87.574219 21.027344 C 80.851562 24.894531 75.136719 28.199219 74.859375 28.378906 C 74.582031 28.5625 74.25 28.902344 74.113281 29.148438 L 73.867188 29.574219 L 73.8125 43.308594 L 73.761719 57.046875 L 63.679688 62.855469 C 58.132812 66.042969 53.515625 68.683594 53.417969 68.707031 C 53.238281 68.757812 53.226562 67.449219 53.226562 42.203125 L 53.226562 15.632812 L 52.960938 15.175781 C 52.628906 14.621094 54.121094 15.507812 39.136719 6.894531 C 26.570312 -0.332031 26.871094 -0.179688 26.027344 0.136719 Z M 37.578125 10.65625 C 42.835938 13.671875 47.136719 16.167969 47.136719 16.199219 C 47.136719 16.230469 42.527344 18.894531 36.894531 22.132812 L 26.644531 28.015625 L 16.414062 22.132812 C 10.792969 18.894531 6.1875 16.230469 6.1875 16.199219 C 6.1875 16.167969 10.785156 13.503906 16.40625 10.273438 L 26.613281 4.402344 L 27.316406 4.785156 C 27.710938 5 32.332031 7.640625 37.578125 10.65625 Z M 110.730469 24.191406 C 116.265625 27.378906 120.84375 30.011719 120.886719 30.054688 C 121.003906 30.160156 100.703125 41.828125 100.425781 41.816406 C 100.148438 41.808594 80.097656 30.246094 80.105469 30.105469 C 80.117188 29.945312 100.289062 18.339844 100.492188 18.371094 C 100.585938 18.394531 105.195312 21.015625 110.730469 24.191406 Z M 14.828125 25.875 L 24.585938 31.492188 L 24.640625 59.304688 L 24.691406 87.121094 L 24.929688 87.496094 C 25.054688 87.695312 25.289062 87.964844 25.460938 88.089844 C 25.621094 88.207031 31.050781 91.300781 37.523438 94.953125 L 49.28125 101.59375 L 49.28125 113.359375 C 49.28125 119.816406 49.238281 125.113281 49.183594 125.113281 C 49.140625 125.113281 38.976562 119.296875 26.601562 112.175781 L 4.105469 99.238281 L 4.074219 59.464844 L 4.054688 19.703125 L 4.554688 19.980469 C 4.84375 20.132812 9.460938 22.785156 14.828125 25.875 Z M 49.28125 45.453125 L 49.28125 71.082031 L 48.886719 71.339844 C 48.351562 71.679688 28.8125 82.910156 28.746094 82.910156 C 28.714844 82.910156 28.691406 71.339844 28.691406 57.195312 L 28.703125 31.492188 L 38.910156 25.621094 C 44.523438 22.390625 49.152344 19.769531 49.207031 19.789062 C 49.246094 19.8125 49.28125 31.363281 49.28125 45.453125 Z M 88.222656 39.558594 L 98.453125 45.441406 L 98.453125 57.101562 C 98.453125 68.164062 98.441406 68.757812 98.273438 68.695312 C 98.164062 68.652344 93.535156 66 87.980469 62.800781 L 77.867188 56.992188 L 77.867188 45.335938 C 77.867188 38.917969 77.898438 33.675781 77.929688 33.675781 C 77.972656 33.675781 82.601562 36.320312 88.222656 39.558594 Z M 123.09375 45.261719 C 123.09375 51.644531 123.050781 56.910156 123.007812 56.960938 C 122.933594 57.078125 102.699219 68.738281 102.570312 68.738281 C 102.539062 68.738281 102.507812 63.496094 102.507812 57.078125 L 102.507812 45.421875 L 112.714844 39.546875 C 118.335938 36.320312 122.964844 33.675781 123.007812 33.675781 C 123.0625 33.675781 123.09375 38.886719 123.09375 45.261719 Z M 86.230469 66.46875 C 94.835938 71.421875 96.320312 72.308594 96.171875 72.425781 C 96.074219 72.488281 92.8125 74.363281 88.929688 76.582031 C 85.046875 78.796875 74.988281 84.53125 66.570312 89.328125 L 51.273438 98.054688 L 50.785156 97.789062 C 47.863281 96.191406 30.910156 86.546875 30.910156 86.472656 C 30.902344 86.3125 75.765625 60.53125 75.945312 60.597656 C 76.03125 60.628906 80.660156 63.269531 86.230469 66.46875 Z M 98.433594 87.558594 L 98.398438 99.238281 L 75.914062 112.175781 C 63.542969 119.296875 53.375 125.113281 53.324219 125.113281 C 53.269531 125.113281 53.226562 120.359375 53.226562 113.359375 L 53.226562 101.59375 L 75.765625 88.742188 C 88.148438 81.675781 98.324219 75.890625 98.378906 75.878906 C 98.421875 75.878906 98.441406 81.132812 98.433594 87.558594 Z M 98.433594 87.558594 "
    />
  </svg>
));

const RustLogo = memo(() => (
  <svg className="w-13 h-13 text-gray-700" viewBox="0 0 128 128" fill="none">
    <path
      fill="currentColor"
      d="M62.96.242c-.232.135-1.203 1.528-2.16 3.097-2.4 3.94-2.426 3.942-5.65.549-2.098-2.207-2.605-2.611-3.28-2.606-.44.002-.995.152-1.235.332-.239.18-.916 1.612-1.504 3.183-1.346 3.6-1.41 3.715-2.156 3.859-.46.087-1.343-.406-3.463-1.928-1.565-1.125-3.1-2.045-3.411-2.045-1.291 0-1.655.706-2.27 4.4-.78 4.697-.754 4.681-4.988 2.758-1.71-.776-3.33-1.411-3.603-1.411-.274 0-.792.294-1.15.653-.652.652-.653.655-.475 4.246l.178 3.595-.68.364c-.602.322-1.017.283-3.684-.348-3.48-.822-4.216-.8-4.92.15l-.516.693.692 2.964c.38 1.63.745 3.2.814 3.487.067.287-.05.746-.26 1.02-.348.448-.717.489-3.939.44-5.453-.086-5.762.382-3.51 5.3.717 1.56 1.304 2.979 1.304 3.149 0 .899-.717 1.225-3.794 1.728-1.722.28-3.218.51-3.326.51-.107 0-.43.235-.717.522-.937.936-.671 1.816 1.453 4.814 2.646 3.735 2.642 3.749-1.73 5.421-4.971 1.902-5.072 2.37-1.287 5.96 3.525 3.344 3.53 3.295-.461 5.804C.208 62.8.162 62.846.085 63.876c-.093 1.253-.071 1.275 3.538 3.48 3.57 2.18 3.57 2.246.067 5.56C-.078 76.48.038 77 5.013 78.877c4.347 1.64 4.353 1.66 1.702 5.394-1.502 2.117-1.981 2.999-1.981 3.653 0 1.223.637 1.535 4.441 2.174 3.205.54 3.919.857 3.919 1.741 0 .182-.588 1.612-1.307 3.177-2.236 4.87-1.981 5.275 3.311 5.275 4.929 0 4.798-.15 3.736 4.294-.8 3.35-.813 3.992-.088 4.715.554.556 1.6.494 4.87-.289 2.499-.596 2.937-.637 3.516-.328l.661.354-.178 3.594c-.178 3.593-.177 3.595.475 4.248.358.359.884.652 1.165.652.282 0 1.903-.631 3.604-1.404 4.22-1.916 4.194-1.932 4.973 2.75.617 3.711.977 4.4 2.294 4.4.327 0 1.83-.88 3.34-1.958 2.654-1.893 3.342-2.19 4.049-1.74.182.115.89 1.67 1.572 3.455 1.003 2.625 1.37 3.309 1.929 3.576 1.062.509 1.72.1 4.218-2.62 3.016-3.286 3.14-3.27 5.602.72 2.72 4.406 3.424 4.396 6.212-.089 2.402-3.864 2.374-3.862 5.621-.47 2.157 2.25 2.616 2.61 3.343 2.61.464 0 1.019-.175 1.23-.388.214-.213.92-1.786 1.568-3.496.649-1.71 1.321-3.2 1.495-3.31.687-.436 1.398-.13 4.048 1.752 1.56 1.108 3.028 1.959 3.377 1.959 1.296 0 1.764-.92 2.302-4.534.46-3.082.554-3.378 1.16-3.685.596-.302.954-.2 3.75 1.07 1.701.77 3.323 1.402 3.604 1.402.282 0 .816-.302 1.184-.672l.672-.67-.184-3.448c-.177-3.291-.16-3.468.364-3.943.54-.488.596-.486 3.615.204 3.656.835 4.338.857 5.025.17.671-.671.664-.818-.254-4.691-1.03-4.345-1.168-4.19 3.78-4.19 3.374 0 3.75-.048 4.18-.522.718-.793.547-1.702-.896-4.779-.729-1.55-1.32-2.96-1.315-3.135.024-.914.743-1.227 4.065-1.767 2.033-.329 3.553-.711 3.829-.96.923-.833.584-1.918-1.523-4.873-2.642-3.703-2.63-3.738 1.599-5.297 5.064-1.866 5.209-2.488 1.419-6.09-3.51-3.335-3.512-3.317.333-5.677 4.648-2.853 4.655-3.496.082-6.335-3.933-2.44-3.93-2.406-.405-5.753 3.78-3.593 3.678-4.063-1.295-5.965-4.388-1.679-4.402-1.72-1.735-5.38 1.588-2.18 1.982-2.903 1.982-3.65 0-1.306-.586-1.598-4.436-2.22-3.216-.52-3.924-.835-3.924-1.75 0-.174.588-1.574 1.307-3.113 1.406-3.013 1.604-4.22.808-4.94-.428-.387-1-.443-4.067-.392-3.208.054-3.618.008-4.063-.439-.486-.488-.48-.557.278-3.725.931-3.881.935-3.975.17-4.694-.777-.73-1.262-.718-4.826.121-2.597.612-3.027.653-3.617.337l-.67-.36.185-3.582.186-3.581-.67-.67c-.369-.369-.891-.67-1.163-.67-.27 0-1.884.64-3.583 1.422-2.838 1.306-3.143 1.393-3.757 1.072-.612-.32-.714-.637-1.237-3.829-.603-3.693-.977-4.412-2.288-4.412-.311 0-1.853.925-3.426 2.055-2.584 1.856-2.93 2.032-3.574 1.807-.533-.186-.843-.59-1.221-1.599-.28-.742-.817-2.172-1.194-3.177-.762-2.028-1.187-2.482-2.328-2.482-.637 0-1.213.458-3.28 2.604-3.249 3.375-3.261 3.374-5.65-.545C66.073 1.78 65.075.382 64.81.24c-.597-.321-1.3-.32-1.85.002m2.96 11.798c2.83 2.014 1.326 6.75-2.144 6.75-3.368 0-5.064-4.057-2.659-6.36 1.357-1.3 3.303-1.459 4.804-.39m-3.558 12.507c1.855.705 2.616.282 6.852-3.8l3.182-3.07 1.347.18c4.225.56 12.627 4.25 17.455 7.666 4.436 3.14 10.332 9.534 12.845 13.93l.537.942-2.38 5.364c-1.31 2.95-2.382 5.673-2.382 6.053 0 .878.576 2.267 1.13 2.726.234.195 2.457 1.265 4.939 2.378l4.51 2.025.178 1.148c.23 1.495.26 5.167.052 6.21l-.163.816h-2.575c-2.987 0-2.756-.267-2.918 3.396-.118 2.656-.76 4.124-2.219 5.075-2.378 1.551-6.305 1.27-7.97-.571-.256-.283-.753-1.704-1.106-3.16-1.03-4.253-2.413-6.64-5.193-8.964-.878-.733-1.595-1.418-1.595-1.522 0-.102.965-.915 2.145-1.803 4.298-3.24 6.77-7.012 7.04-10.747.519-7.126-5.158-13.767-13.602-15.92-2.002-.51-2.857-.526-27.624-.526-14.057 0-25.559-.092-25.559-.204 0-.263 3.124-3.295 4.964-4.816 5.054-4.178 11.618-7.465 18.417-9.221l2.35-.609 3.341 3.387c1.838 1.863 3.64 3.499 4.002 3.637M20.3 46.339c1.539 1.008 2.17 3.54 1.26 5.062-1.405 2.356-4.966 2.455-6.373.178-2.046-3.309 1.895-7.349 5.113-5.24m90.672.129c4.026 2.455.906 8.494-3.404 6.587-2.877-1.273-2.97-5.206-.155-6.641 1.174-.6 2.523-.578 3.56.054m-78.81 15.031v15.02h-13.28l-.526-2.285c-1.036-4.5-1.472-9.156-1.211-12.969l.182-2.679 4.565-2.047c2.864-1.283 4.706-2.262 4.943-2.625 1.038-1.584.94-2.715-.518-5.933l-.68-1.502h6.523v15.02M70.39 47.132c2.843.74 4.345 2.245 4.349 4.355.002 1.549-.765 2.52-2.67 3.38-1.348.61-1.562.625-10.063.708l-8.686.084v-8.92h7.782c6.078 0 8.112.086 9.288.393m-2.934 21.554c1.41.392 3.076 1.616 3.93 2.888.898 1.337 1.423 3.076 2.667 8.836 1.05 4.869 1.727 6.46 3.62 8.532 2.345 2.566 1.8 2.466 13.514 2.466 5.61 0 10.198.09 10.198.2 0 .197-3.863 4.764-4.03 4.764-.048 0-2.066-.422-4.484-.939-6.829-1.458-7.075-1.287-8.642 6.032l-1.008 4.702-.91.448c-1.518.75-6.453 2.292-9.01 2.819-4.228.87-8.828 1.163-12.871.822-6.893-.585-16.02-3.259-16.377-4.8-.075-.327-.535-2.443-1.018-4.704-.485-2.26-1.074-4.404-1.31-4.764-1.13-1.724-2.318-1.83-7.547-.674-1.98.439-3.708.796-3.84.796-.248 0-3.923-4.249-3.923-4.535 0-.09 8.728-.194 19.396-.23l19.395-.066.07-6.89c.05-4.865-.018-6.997-.229-7.25-.235-.284-1.486-.358-6.012-.358H53.32v-8.36l6.597.001c3.626.002 7.02.12 7.539.264M37.57 100.019c3.084 1.88 1.605 6.804-2.043 6.8-3.74-.001-5.127-4.881-1.94-6.826 1.055-.643 2.908-.63 3.983.026m56.48.206c1.512 1.108 2.015 3.413 1.079 4.949-2.46 4.035-8.612.828-6.557-3.418 1.01-2.085 3.695-2.837 5.478-1.531"
    />
  </svg>
));

const JavaLogo = memo(() => (
  <svg className="w-13 h-13 text-orange-400" viewBox="0 0 128 128" fill="none">
    <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z" /><path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z" /><path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z" /><path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z" /><path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z" />
    <path fill="currentColor" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z" />
  </svg>
));

const TSLogo = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    className="w-13 h-13 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(0,122,204,0.45)]"
  >
    <path
      fill="#fff"
      d="M22.67 47h99.67v73.67H22.67z"
    />

    <path
      fill="#007acc"
      d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"
    />
  </svg>
));

const ReactLogo = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    className="w-13 h-13 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(97,218,251,0.4)]"
    fill="none"
    stroke="#61DAFB"
    strokeWidth="4"
  >
    <circle cx="64" cy="64" r="8" fill="#61DAFB" />

    <ellipse cx="64" cy="64" rx="56" ry="22" />
    <ellipse cx="64" cy="64" rx="56" ry="22" transform="rotate(60 64 64)" />
    <ellipse cx="64" cy="64" rx="56" ry="22" transform="rotate(120 64 64)" />
  </svg>
));

const TailwindLogo = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    className="w-13 h-13 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_14px_rgba(56,189,248,0.45)]"
    fill="#38bdf8"
  >
    <path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0" />
  </svg>
));

const FlutterLogo = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    className="w-13 h-13 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_14px_rgba(63,182,211,0.45)]"
  >
    <g fill="#3FB6D3">
      <path d="M12.3 64.2L76.3 0h39.4L32.1 83.6z" />
      <path d="M76.3 128h39.4L81.6 93.9l34.1-34.8H76.3L42.2 93.5z" />
    </g>

    <path fill="#27AACD" d="M81.6 93.9l-20-20-19.4 19.6 19.4 19.6z" />

    <path fill="#19599A" d="M115.7 128L81.6 93.9l-20 19.2L76.3 128z" />

    <linearGradient
      id="flutter-gradient"
      x1="59.365"
      y1="116.36"
      x2="86.825"
      y2="99.399"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#1b4e94" />
      <stop offset="0.63" stopColor="#1a5497" />
      <stop offset="1" stopColor="#195a9b" />
    </linearGradient>

    <path fill="url(#flutter-gradient)" d="M61.6 113.1l30.8-8.4-10.8-10.8z" />
  </svg>
));

const FirebaseLogo = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    className="w-13 h-13 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_14px_rgba(255,202,40,0.45)]"
  >
    <path
      fill="#FFC400"
      d="M19.1 100.7L35.2 9.2c.5-2.6 3.8-3.5 5.6-1.6l17.6 17.6-39.3 75.5z"
    />
    <path
      fill="#FF9100"
      d="M19.1 100.7L57.8 25.2l18.5 18.5-57.2 57z"
    />
    <path
      fill="#FF6D00"
      d="M76.3 43.7l13.6-13.6c1.7-1.7 4.6-.8 5.1 1.6l13 69-31.7-57z"
    />
    <path
      fill="#FFC400"
      d="M19.1 100.7l57.2-57 31.7 57-46.1 26.9c-1.7 1-3.8 1-5.5 0L19.1 100.7z"
    />
  </svg>
));

const PythonLogo = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    className="w-13 h-13"
  >
    <path
      fill="#3776AB"
      d="M63.8 0C31.4 0 33.4 14.1 33.4 14.1l.04 14.6h30.9v4.4H21.1S0 30.6 0 64c0 33.4 18.4 32.2 18.4 32.2h11v-15.4s-.6-18.4 18.1-18.4h31.2s17.5.3 17.5-17V17.8S98.9 0 63.8 0Zm-17 10.2a5.6 5.6 0 1 1 0 11.2 5.6 5.6 0 0 1 0-11.2Z"
    />
    <path
      fill="#FFD43B"
      d="M64.2 128c32.4 0 30.4-14.1 30.4-14.1l-.04-14.6H63.7v-4.4h43.2S128 97.4 128 64c0-33.4-18.4-32.2-18.4-32.2h-11v15.4s.6 18.4-18.1 18.4H49.3s-17.5-.3-17.5 17v27.6S29.1 128 64.2 128Zm17-10.2a5.6 5.6 0 1 1 0-11.2 5.6 5.6 0 0 1 0 11.2Z"
    />
  </svg>
));

const NodeLogo = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    className="w-13 h-13 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_14px_rgba(131,205,41,0.45)]"
  >
    <path
      fill="#83CD29"
      d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073z"
    />

    <path
      fill="#83CD29"
      d="M77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.112-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.955-3.978 7.066-13.309 7.066z"
    />
  </svg>
));

const JSLogo = memo(() => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 128 128"
  className="w-13 h-13 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_16px_rgba(240,219,79,0.55)]"
>
  <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z" />
  <path
    fill="#323330"
    d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"
  />
</svg>
));

const CiscoLogo = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-13 h-13 text-[#1BA0D7]"
    fill="currentColor"
  >
    <path d="M16.331 18.171V17.06l-.022.01c-.25.121-.522.19-.801.203a1.186 1.186 0 01-.806-.237 1.038 1.038 0 01-.352-.498 1.21 1.21 0 01-.023-.667c.052-.225.178-.426.357-.569.16-.134.355-.218.562-.242a1.85 1.85 0 011.061.198l.024.013v-1.117l-.051-.014a2.862 2.862 0 00-1.011-.132 2.34 2.34 0 00-.903.206c-.287.132-.54.327-.739.571a2.221 2.221 0 00-.04 2.705c.295.378.709.645 1.175.756.491.12 1.006.102 1.487-.052l.082-.023M5.336 18.171V17.06l-.022.01c-.25.121-.522.19-.801.203a1.183 1.183 0 01-.806-.237 1.03 1.03 0 01-.351-.498 1.202 1.202 0 01-.024-.667c.052-.225.177-.426.357-.569.16-.134.355-.218.562-.242a1.85 1.85 0 011.061.198l.024.013v-1.117l-.051-.014a2.862 2.862 0 00-1.011-.132 2.344 2.344 0 00-.903.206 2.08 2.08 0 00-.74.571 2.224 2.224 0 00-.041 2.705 2.11 2.11 0 001.176.756c.491.12 1.005.102 1.487-.052l.083-.023M9.26 17.249l-.004.957.07.012c.22.041.441.069.664.085.195.019.391.022.587.012.187-.014.372-.049.551-.104.21-.06.405-.163.571-.305a1.16 1.16 0 00.333-.478 1.31 1.31 0 00-.007-.96 1.068 1.068 0 00-.298-.414 1.261 1.261 0 00-.438-.255l-.722-.268a.388.388 0 01-.197-.188.245.245 0 01.008-.219.382.382 0 01.154-.142.798.798 0 01.257-.074c.153-.022.308-.021.46.005.18.02.358.051.533.096l.038.008v-.883l-.069-.015a4.749 4.749 0 00-.543-.097 2.844 2.844 0 00-.714-.003c-.3.027-.585.143-.821.33-.16.126-.281.293-.351.484-.104.29-.105.608 0 .899.054.145.14.274.252.381.097.093.207.173.327.236.157.084.324.149.497.195.057.017.114.035.17.054l.085.031.024.01c.084.03.162.078.226.14.045.042.08.094.101.151a.325.325 0 01.001.161.339.339 0 01-.166.198.856.856 0 01-.275.086 2.032 2.032 0 01-.427.021 5.208 5.208 0 01-.557-.074 9.195 9.195 0 01-.287-.067l-.033-.006zm-2.475.995h1.05v-4.167h-1.05v4.167zm12.162-2.936a1.095 1.095 0 011.541.158 1.094 1.094 0 01-.157 1.541l-.017.014a1.096 1.096 0 01-1.367-1.713m-1.525.854a2.193 2.193 0 002.666 2.107 2.139 2.139 0 00.701-3.937 2.207 2.207 0 00-3.367 1.83M22.961 10.728a.52.52 0 001.039 0V9.573a.52.52 0 00-1.039 0v1.155M20.117 10.728a.522.522 0 001.041 0V8.139a.521.521 0 00-1.04 0v2.589M17.231 11.771a.521.521 0 001.039 0V6.17a.52.52 0 00-1.039 0v5.601M14.393 10.728a.521.521 0 001.04 0V8.139a.52.52 0 00-1.039 0v2.589M11.494 10.728a.522.522 0 001.039 0V9.573a.52.52 0 00-1.039 0v1.155M8.624 10.728a.52.52 0 001.039 0V8.139a.52.52 0 00-1.039 0v2.589M5.737 11.771a.52.52 0 001.039 0V6.17a.52.52 0 00-1.039 0v5.601M2.876 10.728a.522.522 0 001.04 0V8.139a.52.52 0 00-1.039 0v2.589M0 10.728a.521.521 0 001.039 0V9.573a.52.52 0 00-1.039 0v1.155"/>
  </svg>
));

const WiresharkLogo = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-13 h-13 text-[#167EC2]"
    fill="currentColor"
  >
    <path d="m2.95 0c-1.62 0-2.95 1.32-2.95 2.95v18.1c0 1.63 1.32 2.95 2.95 2.95h18.1c1.62 0 2.95-1.32 2.95-2.95v-18.1c-.00024-1.63-1.32-2.95-2.95-2.95zm0 1.09h18.1c1.04 0 1.85.818 1.85 1.86v14h-5.27c-.335-.796-2.57-6.47.283-10.9a.516.517 0 0 0-.443-.794c-5.24.0827-8.2 3.19-9.74 6.21-1.35 2.64-1.63 4.91-1.69 5.53h-4.95v-14c0-1.04.817-1.86 1.85-1.86zm13.6 5.24c-2.62 5.24.248 11.4.248 11.4a.516.517 0 0 0 .469.301h5.62v3.05c0 1.04-.817 1.86-1.85 1.86h-18.1c-1.04 0-1.85-.818-1.85-1.86v-3.05h5.39a.516.517 0 0 0 .514-.477s.226-2.8 1.66-5.62c1.34-2.62 3.67-5.17 7.91-5.57z"/>
  </svg>
));

const ROW_1_ITEMS = [
  { name: "PHP", icon: <PHPLogo />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(129,140,248,0.35)]" },
  { name: "Laravel", icon: <LaravelLogo />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.35)]" },
  { name: "Livewire", icon: <img src={LivewireIcon} className="w-13 h-13 select-none" alt="Livewire" />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(251,112,169,0.35)]" },
  { name: "Java", icon: <JavaLogo />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(251,146,60,0.35)]" },
  { name: "TypeScript", icon: <TSLogo />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(0,122,204,0.35)]" },
  { name: "JavaScript", icon: <JSLogo />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(240,219,79,0.35)]" },
  { name: "React", icon: <ReactLogo />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(97,218,251,0.35)]" },
  { name: "Tailwind CSS", icon: <TailwindLogo />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.35)]" },
  { name: "Node.js", icon: <NodeLogo />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.35)]" },
];

const ROW_2_ITEMS = [
  { name: "Cisco Packet Tracer", icon: <CiscoLogo />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(27,160,215,0.35)]" },
  { name: "Wireshark", icon: <WiresharkLogo />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(22,126,194,0.35)]" },
  { name: "Autopsy", icon: <img src={AutopsyIcon} className="w-13 h-13 select-none" alt="Autopsy" />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.35)]" },
  { name: "Linux", icon: <img src={LinuxIcon} className="w-13 h-13 select-none" alt="Linux" />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(226,232,240,0.3)]" },
  { name: "Python", icon: <PythonLogo />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(234,179,8,0.35)]" },
  { name: "Rust", icon: <RustLogo />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.35)]" },
  { name: "DBeaver", icon: <img src={DBeaverIcon} className="w-13 h-13 select-none" alt="DBeaver" />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(211,158,89,0.35)]" },
  { name: "Firebase", icon: <FirebaseLogo />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(255,202,40,0.35)]" },
  { name: "Flutter", icon: <FlutterLogo />, hoverClass: "hover:drop-shadow-[0_0_10px_rgba(63,182,211,0.35)]" },
];

const TechMarquee = memo(function TechMarquee() {
  const row1List = useMemo(() => [...ROW_1_ITEMS, ...ROW_1_ITEMS], []);
  const row2List = useMemo(() => [...ROW_2_ITEMS, ...ROW_2_ITEMS], []);
  return (
    <div className="flex flex-col gap-1 sm:gap-2">
      {/* Row 1: Right to Left */}
      <div className="marquee-container overflow-hidden py-1 sm:py-2">
        <div className="marquee-content">
          {row1List.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-300 shrink-0 select-none hover:scale-125 cursor-pointer ${item.hoverClass}`}
              title={item.name}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>
      
      {/* Row 2: Left to Right (Reverse) */}
      <div className="marquee-container overflow-hidden py-1 sm:py-2">
        <div className="marquee-content-reverse">
          {row2List.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-300 shrink-0 select-none hover:scale-125 cursor-pointer ${item.hoverClass}`}
              title={item.name}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-wide transition-all border shrink-0 cursor-pointer ${activeTab === tab.id
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
          <div className="space-y-6">
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

            {/* Infinite scrolling technology ticker */}
            <div className="space-y-3">

              <TechMarquee />
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

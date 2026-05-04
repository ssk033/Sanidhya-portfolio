import CSS3Logo from "@/components/icons/CSS3Logo";
import GridBackground from "@/components/ui/grid-background";
import Loader from "@/components/ui/loader";
import Image from "next/image";
import { SectionHeading } from "@/components/portfolio/SectionHeading";
import ProjectCard, { type ProjectCardProps } from "@/components/ProjectCard";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import GithubCalendar from "@/components/GithubCalendar";

const LINKS = {
  github: "https://github.com/ssk033",
  linkedin: "https://www.linkedin.com/in/sanidhya-singh-221b40293/",
  x: "https://x.com/toxx033",
  instagram: "https://www.instagram.com/sanidhya.singh12",
  zingg: "https://github.com/ssk033/Zingg",
  zinggLive: "https://zingg-eight.vercel.app/",
  mealIt: "https://github.com/ssk033/chat_bot_chef",
  mealItLive: "https://mealt-it.vercel.app/",
} as const;

const PROJECTS: ProjectCardProps[] = [
  {
    title: "Zingg — Full Stack Blogging Application",
    githubUrl: LINKS.zingg,
    liveUrl: LINKS.zinggLive,
    livePreviewStyle: "thumbnail",
    problem:
      "Many readers and writers lack a simple, modern place to publish articles and discover content without the noise of generic social feeds.",
    whatItDoes:
      "Zingg is a full-stack blogging platform where users can create accounts, write and edit posts, and browse a clean feed of articles. Authentication and data are handled securely end-to-end.",
    technologies:
      "Next.js, Prisma ORM, NeonDB, TailwindCSS, NextAuth.js, Framer Motion.",
    keyFeatures:
      "User authentication (OAuth2), CRUD for blog posts, responsive UI with smooth animations, server-side rendering for performance and SEO, and a PostgreSQL-backed database via Prisma.",
    myRole:
      "Sole developer designed the architecture, implemented authentication, database schema, API routes, and the front-end UI with a focus on usability and maintainability.",
  },
  {
    title: "Meal-IT!! — Meal Planning & Nutrition Web App",
    githubUrl: LINKS.mealIt,
    liveUrl: LINKS.mealItLive,
    livePreviewStyle: "thumbnail",
    problem:
      "People juggling meal ideas, macros, and grocery reality often bounce between separate apps for chat advice, planning, and logging—with no single flow from “what should I eat?” to tracked nutrition.",
    whatItDoes:
      "Meal-IT!! brings an AI Chef chat, guided meal-plan flows, a Food Tracker that analyses meal photos, a simple nutrition log, and a floating site-guide assistant into one Next.js app. Recipes live in PostgreSQL with optional embedding-backed similarity for smarter suggestions.",
    technologies:
      "Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Prisma ORM, PostgreSQL (Neon) with pgvector, Google Gemini (@google/generative-ai), optional Python Food AI service (CNN + HTTP proxy).",
    keyFeatures:
      "Persisted anonymous Chef sessions; meal-planner chat with locally saved AI drafts; Food Tracker with CNN confidence gating and Gemini vision fallback; nutrition tracker UI; global Gemini site guide; recipe data and embeddings pipeline for RAG-style queries.",
    myRole:
      "Contributor on full-stack delivery: App Router pages and APIs (including food prediction orchestration and Gemini integrations), Prisma/Postgres modelling, and client flows for chat, meal planning, and Food Tracker—alongside teammates covering ML services and broader product work.",
  },
];

/* Skills data — hero shows first 12 via SKILLS.slice(0, 12) */
const SKILLS: { name: string; icon: string; color?: string }[] = [
  { name: "HTML5", icon: "html5", color: "E34F26" },
  { name: "CSS", icon: "css3", color: "1572B6" },
  { name: "Javascript", icon: "javascript", color: "F7DF1E" },
  { name: "MongoDB", icon: "mongodb", color: "47A248" },
  { name: "React.js", icon: "react", color: "61DAFB" },
  { name: "Typescript", icon: "typescript", color: "3178C6" },
  { name: "Git", icon: "git", color: "F05032" },
  { name: "Figma", icon: "figma", color: "F24E1E" },
  { name: "Tailwind", icon: "tailwindcss", color: "06B6D4" },
  { name: "Prisma", icon: "prisma", color: "2D3748" },
  { name: "Node.js", icon: "nodedotjs", color: "339933" },
  { name: "Express.js", icon: "express", color: "A1A1AA" },
  { name: "PostgresSQL", icon: "postgresql", color: "4169E1" },
  { name: "Next.js", icon: "nextdotjs", color: "E5E5E5" },
  { name: "Python", icon: "python", color: "3776AB" },
  { name: "Java", icon: "openjdk", color: "437291" },
];

const SKILL_ICON_BASE = "https://cdn.simpleicons.org";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative">
      {/* Theme-aware grid background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <GridBackground />
      </div>
      <main className="relative z-10 mx-auto max-w-5xl space-y-12 px-6 py-8 md:space-y-14 md:px-12 md:py-11">
        {/* Profile (left) + Skills (right) */}
        <section className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Profile */}
          <div className="flex flex-col items-start">
            <div className="portfolio-hero-avatar relative mb-4 h-36 w-36 shrink-0 overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--surface,var(--background))] shadow-[0_0_40px_-12px_var(--color-glow)] md:h-40 md:w-40">
              <Image
                src="/iron-man.jpg"
                alt="Sanidhya Singh"
                fill
                className="object-cover"
                sizes="144px"
                priority
              />
            </div>
            <div className="group/name inline-block rounded-lg px-1 py-0.5 transition-all duration-300 ease-out">
              <h1 className="profile-name-gloss name-scale text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-5xl md:tracking-tight">
                Sanidhya Singh
              </h1>
              <p className="profile-name-gloss-sub name-scale mt-2 text-base font-medium leading-snug text-[var(--muted)] md:text-lg">
                Full Stack Developer & CSE Undergrad
              </p>
            </div>
            <p className="mt-2.5 flex items-center gap-2 text-sm leading-snug text-[var(--muted)]">
              <svg
                className="h-4 w-4 shrink-0 text-[var(--color-primary)] opacity-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Bengaluru, Karnataka, India</span>
            </p>

            {/* Contact: plain text only */}
            <div className="mt-3 space-y-1 text-sm leading-snug">
              <p className="text-[var(--muted)]">
                <span className="font-medium text-[color-mix(in_srgb,var(--foreground)_55%,var(--muted))]">
                  Email:
                </span>{" "}
                sanidhyasingh1202@gmail.com
              </p>
              <p className="text-[var(--muted)]">
                <span className="font-medium text-[color-mix(in_srgb,var(--foreground)_55%,var(--muted))]">
                  Phone:
                </span>{" "}
                +91 99177 18512
              </p>
            </div>

            <p className="mt-4 max-w-md text-justify [text-align-last:left] text-[14px] leading-snug text-[var(--muted)] md:text-[15px] md:leading-relaxed">
              I am a frontend-focused developer who enjoys building clean,
              user-friendly web experiences and continuously improving through
              real projects. I am open to work opportunities and comfortable
              with React.js, TypeScript, Next.js, and modern tooling while
              learning deeper full-stack engineering practices.
            </p>

            {/* Social: GitHub, LinkedIn, X, Instagram, theme */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn flex size-10 shrink-0 items-center justify-center rounded-xl text-[var(--foreground)]"
                aria-label="GitHub profile"
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn flex size-10 shrink-0 items-center justify-center rounded-xl text-[var(--foreground)]"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a
                href={LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn flex size-10 shrink-0 items-center justify-center rounded-xl text-[var(--foreground)]"
                aria-label="X (Twitter) profile"
              >
                <XIcon className="h-5 w-5" />
              </a>
              <a
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn flex size-10 shrink-0 items-center justify-center rounded-xl text-[var(--foreground)]"
                aria-label="Instagram profile"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <ThemeSwitcher />
            </div>
          </div>

          {/* Skills moved into hero right side */}
          <div className="flex w-full items-center justify-center md:justify-end">
            <aside className="portfolio-hero-skills-panel w-full max-w-xl rounded-2xl border border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] bg-[color-mix(in_srgb,var(--surface,var(--background))_68%,transparent)] p-4 backdrop-blur-md md:p-5">
              <h2 className="text-sm font-semibold tracking-wide text-[color-mix(in_srgb,var(--foreground)_66%,var(--muted))] md:text-base">
                Skills
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
                {SKILLS.slice(0, 12).map((skill) => (
                  <span
                    key={`hero-skill-${skill.name}`}
                    role="presentation"
                    className="skill-btn inline-flex cursor-default items-center justify-center gap-1.5 overflow-hidden rounded-full border bg-[color-mix(in_srgb,var(--surface,var(--background))_88%,transparent)] px-3 py-1.5 text-[13px] font-medium leading-snug text-[var(--foreground)] backdrop-blur-sm sm:gap-2 sm:text-sm"
                  >
                    {skill.name === "CSS" ? (
                      <CSS3Logo className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" />
                    ) : (
                      <img
                        src={`${SKILL_ICON_BASE}/${skill.icon}/${skill.color ?? "ffffff"}`}
                        alt=""
                        className="h-4 w-4 shrink-0 object-contain sm:h-[18px] sm:w-[18px]"
                        width={24}
                        height={24}
                      />
                    )}
                    <span className="whitespace-nowrap">{skill.name}</span>
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* Projects */}
        <section className="border-t border-[color-mix(in_srgb,var(--foreground)_8%,transparent)] pt-12 md:pt-14">
          <SectionHeading title="Projects" />
          <div className="mt-7 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
          <div className="h-6 shrink-0" aria-hidden />
        </section>

        {/* GitHub Activity */}
        <section className="border-t border-[color-mix(in_srgb,var(--foreground)_8%,transparent)] pt-12 md:pt-14">
          <SectionHeading title="GitHub Activity" />
          <div className="mx-auto mt-7 max-w-5xl">
            <GithubCalendar username="ssk033" profileUrl={LINKS.github} />
          </div>
        </section>

        {/* Achievements & Additional Info */}
        <section className="border-t border-[color-mix(in_srgb,var(--foreground)_8%,transparent)] pt-12 md:pt-14">
          <SectionHeading title="Achievements & More" />
          <div className="mt-9 grid gap-6 md:grid-cols-2 md:gap-6 lg:gap-7">
            <article className="portfolio-card flex w-full flex-col rounded-2xl p-6">
              <header className="border-b border-[color-mix(in_srgb,var(--foreground)_8%,transparent)] pb-4">
                <h3 className="text-base font-semibold tracking-tight text-[var(--foreground)] md:text-lg">
                  Achievements & Recognitions
                </h3>
                <div className="mt-2.5 h-0.5 w-12 rounded-full bg-[var(--color-primary)]/50" />
              </header>
              <ul className="mt-4 space-y-2">
                {[
                  "Achieved All India Rank 18,897 in JEE Advanced 2023 among 1.5 million+ candidates",
                  "Secured All India Rank 883 in COMEDK 2023",
                  "Generated 250,000+ organic impressions as geopolitical analyst on X (Twitter) through research-driven content and analytical threads",
                  "Active contributor to technical and geopolitical discourse with engaged online community",
                ].map((text, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-snug text-[var(--muted)] md:leading-relaxed">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-primary)]/90" aria-hidden />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="portfolio-card flex w-full flex-col rounded-2xl p-6">
              <header className="border-b border-[color-mix(in_srgb,var(--foreground)_8%,transparent)] pb-4">
                <h3 className="text-base font-semibold tracking-tight text-[var(--foreground)] md:text-lg">
                  Additional Information
                </h3>
                <div className="mt-2.5 h-0.5 w-12 rounded-full bg-[var(--color-primary)]/50" />
              </header>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Areas of Interest
                  </h4>
                  <p className="mt-1.5 text-sm leading-snug text-[var(--muted)] md:leading-relaxed">
                    Scalable Web Technologies, Software Engineering, Geopolitics, Public Policy
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    Languages
                  </h4>
                  <p className="mt-1.5 text-sm leading-snug text-[var(--muted)] md:leading-relaxed">
                    English (Fluent), Hindi (Native)
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-4 border-t border-[color-mix(in_srgb,var(--foreground)_8%,transparent)] pb-6 pt-8">
          <p className="text-sm text-[var(--muted)]">
            © {new Date().getFullYear()} Sanidhya Singh
          </p>
          <Loader className="scale-75" />
        </footer>
      </main>
    </div>
  );
}

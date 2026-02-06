import CSS3Logo from "@/components/icons/CSS3Logo";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/3d-card";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const LINKS = {
  github: "https://github.com/ssk033",
  linkedin: "https://www.linkedin.com/in/sanidhya-singh-221b40293/",
  x: "https://x.com/toxx033",
  zingg: "https://github.com/ssk033/Zingg",
  zinggLive: "https://zingg-eight.vercel.app/",
  chefAi: "https://github.com/ssk033/chat_bot_chef",
  chefAiLive: "https://chef-ai-blond.vercel.app/",
} as const;

/* Simple Icons slug per skill; layout: row1=5, row2=4, row3=5, row4=4 (centered) */
const SKILLS: { name: string; icon: string }[] = [
  { name: "HTML5", icon: "html5" },
  { name: "CSS", icon: "css3" },
  { name: "Javascript", icon: "javascript" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "React.js", icon: "react" },
  { name: "Typescript", icon: "typescript" },
  { name: "Git", icon: "git" },
  { name: "Figma", icon: "figma" },
  { name: "Tailwind", icon: "tailwindcss" },
  { name: "Prisma", icon: "prisma" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "Express.js", icon: "express" },
  { name: "PostgresSQL", icon: "postgresql" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "Python", icon: "python" },
  { name: "Java", icon: "openjdk" },
];

const SKILL_ICON_BASE = "https://cdn.simpleicons.org";

/* 8-col grid: 4 buttons span 2 cols each; 3-button rows sit in gaps (col-start-2,4,6) */
function getSkillColClass(index: number): string {
  if (index === 4) return "col-start-2 col-span-2";
  if (index === 5) return "col-start-4 col-span-2";
  if (index === 6) return "col-start-6 col-span-2";
  if (index === 11) return "col-start-2 col-span-2";
  if (index === 12) return "col-start-4 col-span-2";
  if (index === 13) return "col-start-6 col-span-2";
  if (index === 14) return "col-start-3 col-span-2";
  if (index === 15) return "col-start-5 col-span-2";
  return "col-span-2";
}

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

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative">
      {/* Full-site beams background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <BackgroundBeamsWithCollision className="!h-full min-h-screen w-full">
          {null}
        </BackgroundBeamsWithCollision>
      </div>
      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10 md:px-10">
        {/* Top row: Profile (left) + Skills (right) */}
        <section className="grid gap-12 pb-12 md:grid-cols-[1fr_1fr] md:gap-8">
          {/* Profile */}
          <div className="flex flex-col items-start">
            <div className="relative mb-5 h-40 w-40 shrink-0 overflow-hidden rounded-full border-2 border-[var(--border)] bg-gradient-to-br from-[var(--accent-purple)]/40 to-[var(--accent-yellow)]/30">
              <Image
                src="/iron-man.jpg"
                alt="Sanidhya Singh"
                fill
                className="object-cover"
                sizes="160px"
                priority
              />
            </div>
            <div className="group/name inline-block rounded-lg px-1 py-0.5 transition-all duration-300 ease-out">
              <h1 className="profile-name-gloss name-scale text-3xl font-bold text-[var(--accent-yellow)] md:text-4xl">
                Sanidhya Singh
              </h1>
              <p className="profile-name-gloss-sub name-scale mt-1 text-lg font-semibold text-[var(--role-color)]">
                Full Stack Developer & CSE Undergrad
              </p>
            </div>
            <p className="mt-3 flex items-center gap-2 text-[var(--muted)]">
              <span aria-hidden>📍</span>
              <span>Bengaluru, Karnataka, India</span>
            </p>

            {/* Contact: plain text only */}
            <div className="mt-4 space-y-1 text-sm text-[var(--foreground)]">
              <p>
                <span className="text-[var(--muted)]">Email:</span>{" "}
                sanidhyasingh1202@gmail.com
              </p>
              <p>
                <span className="text-[var(--muted)]">Phone:</span> +91 99177
                18512
              </p>
            </div>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--foreground)]">
              I am an enthusiast developer just exploring the field and open to
              work, familiar with React.js, TypeScript and many other
              technologies.
            </p>

            {/* Social: LinkedIn, X, and color theme */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[var(--primary-action)]/50 bg-[var(--primary-action)]/10 text-white/90 transition-colors hover:border-[var(--primary-action)] hover:bg-[var(--primary-action)]/25 hover:text-white"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a
                href={LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[var(--primary-action)]/50 bg-[var(--primary-action)]/10 text-white/90 transition-colors hover:border-[var(--primary-action)] hover:bg-[var(--primary-action)]/25 hover:text-white"
                aria-label="X (Twitter) profile"
              >
                <XIcon className="h-5 w-5" />
              </a>
              <ThemeSwitcher />
            </div>
          </div>

          {/* Skills: title centered above grid; 4-3-4-3 with 3-button rows in gaps of 4; no overflow */}
          <div className="flex w-full flex-col items-center">
            <h2 className="w-full text-center text-3xl font-bold text-[var(--accent-yellow)] md:text-4xl">
              Skills
            </h2>
            <div className="mt-6 grid w-full max-w-3xl grid-cols-8 gap-x-4 gap-y-5 sm:gap-x-6 sm:gap-y-6 md:gap-x-6 md:gap-y-6">
              {SKILLS.map((skill, index) => (
                  <span
                    key={skill.name}
                    role="presentation"
                    className={`skill-btn inline-flex cursor-default items-center justify-center gap-2 overflow-hidden rounded-full border-2 bg-[var(--background)] px-4 py-3 text-sm font-medium text-[var(--foreground)] sm:min-w-[10.5rem] sm:gap-2.5 sm:px-5 sm:py-3.5 sm:text-base ${getSkillColClass(index)}`}
                  >
                    {skill.name === "CSS" ? (
                      <CSS3Logo className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
                    ) : (
                      <img
                        src={`${SKILL_ICON_BASE}/${skill.icon}/ffffff`}
                        alt=""
                        className="h-5 w-5 shrink-0 object-contain sm:h-6 sm:w-6"
                        width={24}
                        height={24}
                      />
                    )}
                    <span className="whitespace-nowrap">{skill.name}</span>
                  </span>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="border-t border-[var(--border)] pt-10">
          <div className="flex flex-col items-center">
            <div className="h-px w-16 bg-[var(--accent-purple)]" />
            <h2 className="mt-2 text-3xl font-bold text-[var(--accent-yellow)] md:text-4xl">
              Projects
            </h2>
            <div className="mt-1 h-px w-16 bg-[var(--accent-purple)]" />
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <ProjectCard
              title="Zingg — Full Stack Blogging Application"
              githubUrl={LINKS.zingg}
              liveUrl={LINKS.zinggLive}
              problem="Many readers and writers lack a simple, modern place to publish articles and discover content without the noise of generic social feeds."
              whatItDoes="Zingg is a full-stack blogging platform where users can create accounts, write and edit posts, and browse a clean feed of articles. Authentication and data are handled securely end-to-end."
              technologies="Next.js, Prisma ORM, NeonDB, TailwindCSS, NextAuth.js, Framer Motion."
              keyFeatures="User authentication (OAuth2), CRUD for blog posts, responsive UI with smooth animations, server-side rendering for performance and SEO, and a PostgreSQL-backed database via Prisma."
              myRole="Sole developer — designed the architecture, implemented authentication, database schema, API routes, and the front-end UI with a focus on usability and maintainability."
            />
            <ProjectCard
              title="Chef AI — Intelligent Recipe Recommendation Chatbot"
              githubUrl={LINKS.chefAi}
              liveUrl={LINKS.chefAiLive}
              problem="Finding recipes that match what you have at home or your dietary preferences is time-consuming and often requires sifting through many irrelevant results."
              whatItDoes="Chef AI is a chatbot that recommends recipes using natural language and semantic search. Users can describe ingredients or preferences and get relevant recipe suggestions, with optional text-to-speech for hands-free use."
              technologies="Python, Sentence Transformers, NLP, semantic search, text-to-speech, Google Colab."
              keyFeatures="Semantic search over a recipe corpus, conversational interface, NLP-driven understanding of user queries, text-to-speech for recipe steps, and a pipeline built for experimentation in Colab."
              myRole="Designed and built the recommendation pipeline, integrated sentence transformers for embeddings, implemented the chatbot logic and TTS, and curated and preprocessed the recipe dataset for search."
            />
          </div>
        </section>

        {/* Achievements & Additional Info – 3D cards */}
        <section className="border-t border-[var(--border)] pt-10">
          <div className="flex flex-col items-center">
            <div className="h-px w-16 bg-[var(--accent-purple)]" />
            <h2 className="mt-2 text-3xl font-bold text-[var(--accent-yellow)] md:text-4xl">
              Achievements & More
            </h2>
            <div className="mt-1 h-px w-16 bg-[var(--accent-purple)]" />
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <CardContainer containerClassName="py-0" className="w-full">
              <CardBody className="group/card relative w-full max-w-[30rem] rounded-xl border-2 border-[var(--border)] bg-[var(--surface,var(--background))] p-6 transition-[box-shadow,border-color] duration-300 ease-out hover:border-[var(--accent-yellow)]/70 hover:ring-2 hover:ring-[var(--accent-yellow)]/60 hover:ring-offset-2 hover:ring-offset-[var(--background)] hover:shadow-[0_0_32px_var(--card-glow)]">
                <CardItem translateZ={50} className="mb-4">
                  <h3 className="text-lg font-bold text-[var(--accent-yellow)] tracking-tight">
                    Achievements & Recognitions
                  </h3>
                  <div className="mt-1 h-0.5 w-12 rounded-full bg-[var(--accent-purple)]/60" />
                </CardItem>
                <ul className="space-y-4">
                  {[
                    "Achieved All India Rank 18,897 in JEE Advanced 2023 among 1.5 million+ candidates",
                    "Secured All India Rank 883 in COMEDK 2023",
                    "Generated 250,000+ organic impressions as geopolitical analyst on X (Twitter) through research-driven content and analytical threads",
                    "Active contributor to technical and geopolitical discourse with engaged online community",
                  ].map((text, i) => (
                    <CardItem key={i} translateZ={40 + i * 5} as="li" className="flex gap-3 text-sm leading-relaxed text-[var(--foreground)]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-yellow)]" aria-hidden />
                      <span>{text}</span>
                    </CardItem>
                  ))}
                </ul>
              </CardBody>
            </CardContainer>
            <CardContainer containerClassName="py-0" className="w-full">
              <CardBody className="group/card relative w-full max-w-[30rem] rounded-xl border-2 border-[var(--border)] bg-[var(--surface,var(--background))] p-6 transition-[box-shadow,border-color] duration-300 ease-out hover:border-[var(--accent-yellow)]/70 hover:ring-2 hover:ring-[var(--accent-yellow)]/60 hover:ring-offset-2 hover:ring-offset-[var(--background)] hover:shadow-[0_0_32px_var(--card-glow)]">
                <CardItem translateZ={50} className="mb-4">
                  <h3 className="text-lg font-bold text-[var(--accent-yellow)] tracking-tight">
                    Additional Information
                  </h3>
                  <div className="mt-1 h-0.5 w-12 rounded-full bg-[var(--accent-purple)]/60" />
                </CardItem>
                <div className="space-y-6">
                  <CardItem translateZ={45} as="div">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-purple)]">
                      Areas of Interest
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
                      Scalable Web Technologies, Software Engineering, Geopolitics, Public Policy
                    </p>
                  </CardItem>
                  <CardItem translateZ={50} as="div">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-purple)]">
                      Languages
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
                      English (Fluent), Hindi (Native)
                    </p>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-[var(--border)] pt-6 pb-8">
          <p className="text-sm text-[var(--muted)]">
            2024 @ Sanidhya Singh, Copyright
          </p>
        </footer>
      </main>
    </div>
  );
}

"use client";

import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/3d-card";

type ProjectCardProps = {
  title: string;
  githubUrl: string;
  liveUrl?: string;
  problem: string;
  whatItDoes: string;
  technologies: string;
  keyFeatures: string;
  myRole: string;
};

export default function ProjectCard({
  title,
  githubUrl,
  liveUrl,
  problem,
  whatItDoes,
  technologies,
  keyFeatures,
  myRole,
}: ProjectCardProps) {
  return (
    <CardContainer
      containerClassName="py-0 h-full"
      className="w-full h-full"
    >
      <CardBody className="group/card relative !h-full min-h-0 w-full max-w-[42rem] min-w-0 rounded-xl border-2 border-[var(--border)] bg-[var(--surface,var(--background))] p-6 transition-[box-shadow,border-color] duration-300 ease-out hover:border-[var(--accent-yellow)]/70 hover:ring-2 hover:ring-[var(--accent-yellow)]/60 hover:ring-offset-2 hover:ring-offset-[var(--background)] hover:shadow-[0_0_32px_var(--card-glow)] flex flex-col overflow-visible">
        <CardItem
          translateZ="50"
          className="flex flex-wrap items-start justify-between gap-2"
        >
          <h3 className="text-lg font-semibold text-[var(--accent-yellow)]">
            {title}
          </h3>
          <CardItem
            translateZ={60}
            as="a"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm font-medium text-[var(--accent-purple)] underline underline-offset-2 transition-colors hover:text-[var(--accent-yellow)]"
          >
            View on GitHub →
          </CardItem>
        </CardItem>
        {liveUrl && (
          <CardItem translateZ="45" className="mt-4 w-full">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-lg border-2 border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-yellow)]"
              aria-label="View live site preview"
            >
              <iframe
                src={liveUrl}
                title={`${title} live preview`}
                className="h-40 w-full border-0 bg-white/5 sm:h-48"
                sandbox="allow-scripts allow-same-origin"
              />
            </a>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-block text-xs font-medium text-[var(--accent-purple)] underline underline-offset-2 hover:text-[var(--accent-yellow)]"
            >
              Open live site →
            </a>
          </CardItem>
        )}
        <div className="mt-4 flex-1 space-y-3 text-sm text-[var(--foreground)] overflow-visible min-h-0">
          <CardItem translateZ="40" as="p" className="overflow-visible break-words">
            <strong className="text-[var(--foreground)]">Problem:</strong> {problem}
          </CardItem>
          <CardItem translateZ="45" as="p" className="overflow-visible break-words">
            <strong className="text-[var(--foreground)]">What it does:</strong> {whatItDoes}
          </CardItem>
          <CardItem translateZ="50" as="p" className="overflow-visible break-words">
            <strong className="text-[var(--foreground)]">Technologies used:</strong>{" "}
            {technologies}
          </CardItem>
          <CardItem translateZ="55" as="p" className="overflow-visible break-words">
            <strong className="text-[var(--foreground)]">Key features:</strong> {keyFeatures}
          </CardItem>
          <CardItem translateZ="60" as="p" className="overflow-visible break-words">
            <strong className="text-[var(--foreground)]">My role:</strong> {myRole}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

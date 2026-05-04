import type { ReactNode } from "react";

import { LivePreviewThumbnail } from "@/components/LivePreviewThumbnail";
import { cn } from "@/lib/utils";

export type ProjectCardProps = {
  title: string;
  githubUrl: string;
  liveUrl?: string;
  embedLivePreview?: boolean;
  livePreviewStyle?: "iframe" | "thumbnail";
  problem: string;
  whatItDoes: string;
  technologies: string;
  keyFeatures: string;
  myRole: string;
};

function parseTechPills(technologies: string): string[] {
  return technologies
    .split(/,\s*/)
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Prefer semicolon-separated features; otherwise comma-separated phrases. */
function parseFeatureBullets(keyFeatures: string, max = 3): string[] {
  const semi = keyFeatures.split(";").map((s) => s.trim()).filter(Boolean);
  if (semi.length >= 2) return semi.slice(0, max);
  const comma = keyFeatures.split(",").map((s) => s.trim()).filter(Boolean);
  return comma.slice(0, max);
}

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/** Shared chrome + hover lift for each project row. */
export function ProjectCardShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "project-premium-shell group/project rounded-2xl border border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] bg-[color-mix(in_srgb,var(--surface,var(--background))_45%,transparent)] p-6 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--color-primary)_28%,var(--color-border))] hover:shadow-[0_22px_48px_-32px_rgba(0,0,0,0.55),0_0_36px_-24px_var(--color-glow)] md:p-8",
        className,
      )}
    >
      {children}
    </article>
  );
}

/** Project title — preview sits directly underneath on the card. */
export function ProjectCardHeading({ title }: Pick<ProjectCardProps, "title">) {
  return (
    <h3 className="text-left text-xl font-bold leading-snug tracking-tight text-[var(--foreground)] md:text-2xl md:leading-tight">
      {title}
    </h3>
  );
}

/** Body copy, tech, features, actions (everything below the preview). */
export function ProjectCardContent(props: ProjectCardProps) {
  const {
    title,
    githubUrl,
    liveUrl,
    problem,
    whatItDoes,
    technologies,
    keyFeatures,
    myRole,
  } = props;
  const techPills = parseTechPills(technologies);
  const featureBullets = parseFeatureBullets(keyFeatures, 3);

  return (
    <div className="flex min-w-0 flex-col items-start space-y-5 text-left">
      <div className="space-y-3 text-justify [text-align-last:left]">
        <p className="text-[13px] leading-snug text-[var(--muted)] md:text-sm md:leading-relaxed">
          {problem}
        </p>
        <p className="text-[14px] leading-relaxed text-[color-mix(in_srgb,var(--foreground)_88%,var(--muted))] md:text-[15px]">
          {whatItDoes}
        </p>
      </div>

      <div className="flex flex-wrap justify-start gap-2">
        {techPills.map((tech, i) => (
          <span
            key={`${title}-tech-${i}`}
            className="inline-flex rounded-full border border-[color-mix(in_srgb,var(--foreground)_10%,var(--color-border))] bg-[color-mix(in_srgb,var(--surface,var(--background))_70%,transparent)] px-2.5 py-1 text-[11px] font-medium leading-tight text-[var(--foreground)] md:text-xs"
          >
            {tech}
          </span>
        ))}
      </div>

      {featureBullets.length > 0 && (
        <ul className="w-full space-y-2 text-left">
          {featureBullets.map((item, i) => (
            <li
              key={`${title}-feat-${i}`}
              className="flex gap-2.5 text-sm leading-snug text-[var(--muted)] md:leading-relaxed"
            >
              <span
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-primary)]/85"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <details className="group/details w-full rounded-xl border border-[color-mix(in_srgb,var(--foreground)_8%,transparent)] bg-[color-mix(in_srgb,var(--background)_35%,transparent)] px-3 py-2 text-sm md:px-4 md:py-3">
        <summary className="cursor-pointer select-none text-left font-medium text-[var(--foreground)] outline-none transition-colors hover:text-[color-mix(in_srgb,var(--foreground)_90%,var(--color-primary))] [&::-webkit-details-marker]:hidden">
          Full details (features & role)
        </summary>
        <div className="mt-3 space-y-3 border-t border-[color-mix(in_srgb,var(--foreground)_8%,transparent)] pt-3 text-[13px] leading-relaxed text-[var(--muted)] md:text-sm text-justify [text-align-last:left]">
          <p>
            <strong className="font-semibold text-[var(--foreground)]">
              Key features:
            </strong>{" "}
            {keyFeatures}
          </p>
          <p>
            <strong className="font-semibold text-[var(--foreground)]">
              My role:
            </strong>{" "}
            {myRole}
          </p>
        </div>
      </details>

      <div className="project-premium-actions flex flex-wrap justify-start gap-3 pt-1">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-[color-mix(in_srgb,var(--foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--surface,var(--background))_72%,transparent)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] transition-colors duration-200 hover:border-[color-mix(in_srgb,var(--color-primary)_35%,var(--color-border))] hover:bg-[color-mix(in_srgb,var(--color-hover-surface)_55%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          <GitHubMark className="h-4 w-4 opacity-90" />
          GitHub
        </a>
        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[color-mix(in_srgb,var(--color-primary)_42%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-primary)_14%,transparent)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--color-primary)_22%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            <ExternalLinkIcon className="h-4 w-4 shrink-0 opacity-90" />
            Live demo
          </a>
        ) : null}
      </div>
    </div>
  );
}

export function ProjectCardPreview({
  title,
  githubUrl,
  liveUrl,
  embedLivePreview = true,
  livePreviewStyle = "iframe",
}: Pick<
  ProjectCardProps,
  "title" | "githubUrl" | "liveUrl" | "embedLivePreview" | "livePreviewStyle"
>) {
  const previewShell =
    "project-premium-preview rounded-2xl border border-white/10 bg-[color-mix(in_srgb,var(--surface,var(--background))_78%,transparent)] shadow-[0_0_40px_-22px_var(--color-glow)] transition-[box-shadow] duration-300 ease-out group-hover/project:shadow-[0_24px_52px_-30px_rgba(0,0,0,0.52)]";
  const previewInner =
    "project-premium-preview-inner origin-center transition-transform duration-300 ease-out";

  const previewBody =
    liveUrl == null ? (
      <div className="flex aspect-video min-h-[12rem] w-full flex-col items-center justify-center gap-2 px-4 py-8 text-center">
        <p className="text-sm text-[var(--muted)]">No live demo linked</p>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[var(--color-primary)] underline underline-offset-4 hover:opacity-90"
        >
          View repository →
        </a>
      </div>
    ) : livePreviewStyle === "thumbnail" ? (
      <LivePreviewThumbnail
        liveUrl={liveUrl}
        title={title}
        className="rounded-none border-0 shadow-none"
        imgClassName="aspect-video min-h-[13rem] w-full object-cover object-top transition-transform duration-300 ease-out sm:min-h-[15rem]"
      />
    ) : embedLivePreview ? (
      <iframe
        src={liveUrl}
        title={`${title} live preview`}
        className="aspect-video min-h-[13rem] w-full border-0 bg-white/[0.06] sm:min-h-[15rem]"
        sandbox="allow-scripts allow-same-origin allow-popups"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    ) : (
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex aspect-video min-h-[12rem] w-full flex-col items-center justify-center gap-2 px-4 py-6 text-center backdrop-blur-sm transition-colors hover:bg-[color-mix(in_srgb,var(--color-hover-surface)_40%,transparent)]"
        aria-label={`Open ${title} live site in a new tab`}
      >
        <ExternalLinkIcon className="h-8 w-8 text-[var(--color-primary)] opacity-90" />
        <span className="text-sm font-medium text-[var(--foreground)]">
          Live demo (opens in new tab)
        </span>
        <span className="max-w-[18rem] text-xs leading-snug text-[var(--muted)]">
          This app cannot be embedded here (host security).
        </span>
      </a>
    );

  return (
    <div className="min-w-0">
      <div className={cn(previewShell, "overflow-hidden")}>
        <div className={previewInner}>{previewBody}</div>
      </div>
    </div>
  );
}

type ProjectCardWithLayoutProps = ProjectCardProps & { index?: number };

/**
 * Single column: text on top, preview below (thumbnail stacks vertically).
 * Parent grid places multiple projects side-by-side on larger screens.
 */
export default function ProjectCard({ ...props }: ProjectCardWithLayoutProps) {
  return (
    <ProjectCardShell className="flex h-full min-h-0 flex-col">
      <div className="flex min-h-0 flex-1 flex-col gap-5">
        <ProjectCardHeading title={props.title} />
        <div className="min-w-0">
          <ProjectCardPreview {...props} />
        </div>
        <div className="min-w-0">
          <ProjectCardContent {...props} />
        </div>
      </div>
    </ProjectCardShell>
  );
}

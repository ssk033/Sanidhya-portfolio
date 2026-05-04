import { LivePreviewThumbnail } from "@/components/LivePreviewThumbnail";

type ProjectCardProps = {
  title: string;
  githubUrl: string;
  liveUrl?: string;
  /** Use iframe (interactive). Sites that block frames → use `thumbnail`. */
  embedLivePreview?: boolean;
  /** Static screenshot preview when iframe is blocked (opens URL on click). */
  livePreviewStyle?: "iframe" | "thumbnail";
  problem: string;
  whatItDoes: string;
  technologies: string;
  keyFeatures: string;
  myRole: string;
};

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

export default function ProjectCard({
  title,
  githubUrl,
  liveUrl,
  embedLivePreview = true,
  livePreviewStyle = "iframe",
  problem,
  whatItDoes,
  technologies,
  keyFeatures,
  myRole,
}: ProjectCardProps) {
  return (
    <article className="portfolio-card flex h-full min-h-0 w-full flex-col rounded-2xl p-8">
      <header className="flex flex-wrap items-start justify-between gap-3 gap-y-2 border-b border-[color-mix(in_srgb,var(--foreground)_8%,transparent)] pb-5">
        <h3 className="min-w-0 flex-1 text-base font-semibold leading-snug tracking-tight text-[var(--foreground)] md:text-lg">
          {title}
        </h3>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-sm font-medium text-[var(--color-primary)] underline decoration-[var(--color-border)] underline-offset-[5px] transition-colors duration-200 hover:decoration-[var(--color-primary)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
        >
          View on GitHub →
        </a>
      </header>

      {liveUrl && (
        <div className="mt-5 w-full">
          {livePreviewStyle === "thumbnail" ? (
            <div className="overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] bg-[color-mix(in_srgb,var(--surface,var(--background))_82%,transparent)] backdrop-blur-sm">
              <LivePreviewThumbnail liveUrl={liveUrl} title={title} />
            </div>
          ) : embedLivePreview ? (
            <div className="overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] bg-[color-mix(in_srgb,var(--surface,var(--background))_82%,transparent)] backdrop-blur-sm">
              <iframe
                src={liveUrl}
                title={`${title} live preview`}
                className="h-[11rem] w-full border-0 bg-white/5 sm:h-[13rem]"
                sandbox="allow-scripts allow-same-origin allow-popups"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[9rem] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[color-mix(in_srgb,var(--foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--surface,var(--background))_78%,transparent)] px-4 py-6 text-center backdrop-blur-sm transition-[border-color,box-shadow] duration-[250ms] ease-out hover:border-[var(--color-primary)]/35 hover:shadow-[0_12px_36px_-18px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              aria-label={`Open ${title} live site in a new tab`}
            >
              <ExternalLinkIcon className="h-7 w-7 text-[var(--color-primary)] opacity-90" />
              <span className="text-sm font-medium text-[var(--foreground)]">
                Live demo (opens in new tab)
              </span>
              <span className="max-w-[17rem] text-xs leading-snug text-[var(--muted)]">
                This app cannot be embedded here (host security). Use the link below or tap above.
              </span>
            </a>
          )}
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs font-medium text-[var(--color-primary)] underline underline-offset-[3px] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/35 focus-visible:rounded-sm"
          >
            Open live site →
          </a>
        </div>
      )}

      <div className="mt-6 flex-1 space-y-3.5 text-[13px] leading-relaxed text-[var(--muted)] text-justify hyphens-auto [text-align-last:left] sm:text-sm">
        <p className="break-words">
          <strong className="font-semibold text-[var(--foreground)]">Problem:</strong>{" "}
          {problem}
        </p>
        <p className="break-words">
          <strong className="font-semibold text-[var(--foreground)]">What it does:</strong>{" "}
          {whatItDoes}
        </p>
        <p className="break-words">
          <strong className="font-semibold text-[var(--foreground)]">Technologies used:</strong>{" "}
          {technologies}
        </p>
        <p className="break-words">
          <strong className="font-semibold text-[var(--foreground)]">Key features:</strong>{" "}
          {keyFeatures}
        </p>
        <p className="break-words">
          <strong className="font-semibold text-[var(--foreground)]">My role:</strong>{" "}
          {myRole}
        </p>
      </div>
    </article>
  );
}

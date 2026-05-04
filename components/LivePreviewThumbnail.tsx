"use client";

import { useState } from "react";

type LivePreviewThumbnailProps = {
  liveUrl: string;
  title: string;
  className?: string;
  /** Override screenshot sizing (default tuned for compact cards). */
  imgClassName?: string;
};

/**
 * Shows a live-site screenshot thumbnail (WordPress mshots) when iframe embed is blocked.
 * Tap-through opens the real URL in a new tab.
 */
export function LivePreviewThumbnail({
  liveUrl,
  title,
  className,
  imgClassName,
}: LivePreviewThumbnailProps) {
  const [failed, setFailed] = useState(false);
  const src = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(liveUrl)}?w=1600`;

  if (failed) {
    return (
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex min-h-[9rem] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[color-mix(in_srgb,var(--foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--surface,var(--background))_78%,transparent)] px-4 py-6 text-center text-sm text-[var(--muted)] backdrop-blur-sm transition-colors hover:border-[var(--color-primary)]/35 hover:text-[var(--foreground)] ${className ?? ""}`}
        aria-label={`Open ${title} live site`}
      >
        Preview image unavailable — open live site
      </a>
    );
  }

  return (
    <a
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden rounded-xl bg-[var(--surface)] outline-none transition-[box-shadow] duration-200 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.45)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${className ?? ""}`}
      aria-label={`Open ${title} live site`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- remote screenshot URL, no optimization */}
      <img
        src={src}
        alt=""
        width={1600}
        height={900}
        loading="lazy"
        referrerPolicy="no-referrer"
        decoding="async"
        className={
          imgClassName ??
          "h-[11rem] w-full origin-center object-cover object-top transition-transform duration-200 group-hover:scale-[1.02] sm:h-[13rem]"
        }
        onError={() => setFailed(true)}
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 py-2 text-center text-[11px] font-medium text-white/95 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:text-xs">
        Open live site →
      </span>
    </a>
  );
}

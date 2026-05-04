"use client";

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type GridBackgroundProps = {
  className?: string;
  /** Radial mask so the grid softens toward the viewport edges. Default true. */
  withFade?: boolean;
};

/**
 * Fixed backdrop stack: base gradient → glow blobs → mid light → grid → vignette → noise.
 * Content must stay above with z-10+.
 */
export default function GridBackground({
  className,
  withFade = true,
}: GridBackgroundProps) {
  const gridMask =
    "radial-gradient(ellipse 96% 90% at 50% 46%, black 0%, black 28%, transparent 74%)";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 isolate z-0 min-h-screen w-full overflow-hidden",
        className,
      )}
    >
      {/* 1 — Gradient base */}
      <div className="page-bg-base-layer absolute inset-0 z-[1]" aria-hidden />

      {/* 2 — Radial glows (primary TL, accent BR) */}
      <div className="absolute inset-0 z-[2]" aria-hidden>
        <div
          className="page-bg-glow-blob-primary absolute -left-[38%] -top-[30%] size-[min(125vw,72rem)] rounded-full opacity-[0.22] blur-[132px]"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in srgb, var(--color-primary) 52%, transparent), transparent 62%)",
          }}
        />
        <div
          className="page-bg-glow-blob-accent absolute -bottom-[28%] -right-[34%] size-[min(128vw,76rem)] rounded-full opacity-[0.18] blur-[142px]"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in srgb, var(--color-accent) 46%, transparent), transparent 65%)",
          }}
        />
      </div>

      {/* 3 — Center lift */}
      <div className="page-bg-mid-light absolute inset-0 z-[3]" aria-hidden />

      {/* 4 — Theme grid */}
      <div
        className={cn(
          "absolute inset-0 z-[4] grid-bg-lines opacity-[0.13] sm:opacity-[0.17]",
          withFade && [
            "[mask-image:var(--page-grid-mask)] [-webkit-mask-image:var(--page-grid-mask)] [mask-size:100%_100%]",
          ],
        )}
        style={
          withFade
            ? ({ "--page-grid-mask": gridMask } as CSSProperties)
            : undefined
        }
        aria-hidden
      />

      {/* 5 — Vignette */}
      <div className="page-bg-vignette absolute inset-0 z-[5]" aria-hidden />

      {/* 6 — Grain */}
      <div className="page-bg-noise absolute inset-0 z-[6]" aria-hidden />
    </div>
  );
}

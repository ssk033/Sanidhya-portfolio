"use client";

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type GridBackgroundProps = {
  className?: string;
  /** Radial mask so grid reads stronger in the centre and falls off toward edges */
  withFade?: boolean;
};

/**
 * Fixed backdrop stack: base gradient → glow blobs → mid-light → centre aura (Rajputana)
 * → grid → light sweep → vignette → noise.
 * Content must stay above with z-10+.
 */
export default function GridBackground({
  className,
  withFade = true,
}: GridBackgroundProps) {
  const gridMask =
    "radial-gradient(ellipse 96% 94% at 50% 46%, black 0%, black 34%, transparent 80%)";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 isolate z-0 min-h-screen w-full overflow-hidden",
        className,
      )}
    >
      {/* 1 — Gradient base */}
      <div className="page-bg-base-layer absolute inset-0 z-[1]" aria-hidden />

      {/* 2 — Radial glow blobs (colour from globals; blur + opacity in CSS) */}
      <div className="absolute inset-0 z-[2]" aria-hidden>
        <div className="page-bg-glow-blob-primary page-bg-glow-primary-fill absolute -left-[42%] -top-[34%] size-[min(142vw,82rem)] rounded-full" />
        <div className="page-bg-glow-blob-accent page-bg-glow-accent-fill absolute -bottom-[32%] -right-[38%] size-[min(145vw,85rem)] rounded-full" />
      </div>

      {/* 3 — Centre lift */}
      <div className="page-bg-mid-light absolute inset-0 z-[3]" aria-hidden />

      {/* 3b — Royal spotlight (Rajputana only; opacity in globals) */}
      <div className="rajput-bg-center-aura absolute inset-0 z-[3]" aria-hidden />

      {/* 4 — Theme grid */}
      <div
        className={cn(
          "absolute inset-0 z-[4] grid-bg-lines opacity-[0.17] sm:opacity-[0.22]",
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

      {/* 5 — Subtle moving light sweep */}
      <div className="page-bg-light-sweep absolute inset-0 z-[5]" aria-hidden />

      {/* 6 — Vignette */}
      <div className="page-bg-vignette absolute inset-0 z-[6]" aria-hidden />

      {/* 7 — Grain */}
      <div className="page-bg-noise absolute inset-0 z-[7]" aria-hidden />
    </div>
  );
}

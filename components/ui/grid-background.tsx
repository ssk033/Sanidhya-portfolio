"use client";

import { cn } from "@/lib/utils";

type GridBackgroundProps = {
  className?: string;
  /** Radial fade mask so grid softens toward center. Default true. */
  withFade?: boolean;
};

export default function GridBackground({
  className,
  withFade = true,
}: GridBackgroundProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 min-h-screen w-full bg-[var(--background)]",
        className,
      )}
    >
      <div
        className="absolute inset-0 grid-bg-lines opacity-[0.28] sm:opacity-[0.32]"
        aria-hidden
      />
      {withFade && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-[var(--background)] [mask-image:radial-gradient(ellipse_85%_85%_at_50%_45%,transparent_50%,black)]"
          aria-hidden
        />
      )}
    </div>
  );
}

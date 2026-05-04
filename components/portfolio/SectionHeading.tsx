type SectionHeadingProps = {
  title: string;
};

/** Uniform section titles + thin theme accent (no idle glow). */
export function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <div className="portfolio-section-heading flex flex-col items-center gap-2.5 md:gap-3">
      <h2 className="text-center text-lg font-semibold tracking-tight text-[var(--foreground)] md:text-xl md:tracking-tight">
        {title}
      </h2>
      <div
        className="h-[3px] w-14 shrink-0 rounded-full bg-[var(--color-primary)] opacity-75 md:w-16"
        aria-hidden
      />
    </div>
  );
}

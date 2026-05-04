type SectionHeadingProps = {
  title: string;
};

/** Uniform section titles + thin theme accent (no idle glow). */
export function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-center text-xl font-semibold tracking-tight text-[var(--foreground)] md:text-2xl md:tracking-tight">
        {title}
      </h2>
      <div
        className="h-[3px] w-16 shrink-0 rounded-full bg-[var(--color-primary)] opacity-75 md:w-[4.5rem]"
        aria-hidden
      />
    </div>
  );
}

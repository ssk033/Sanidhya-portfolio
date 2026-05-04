"use client";

import { GitHubCalendar as GHContributionCalendar } from "react-github-calendar";
import { useMemo, useState } from "react";

const CONTRIBUTION_THEME = {
  light: [
    "color-mix(in srgb, var(--foreground) 10%, var(--background))",
    "color-mix(in srgb, var(--color-primary) 22%, var(--background))",
    "color-mix(in srgb, var(--color-accent) 38%, var(--background))",
    "color-mix(in srgb, var(--color-primary) 62%, var(--color-accent))",
    "var(--color-primary)",
  ],
  dark: [
    "color-mix(in srgb, var(--foreground) 10%, var(--background))",
    "color-mix(in srgb, var(--color-primary) 22%, var(--background))",
    "color-mix(in srgb, var(--color-accent) 38%, var(--background))",
    "color-mix(in srgb, var(--color-primary) 62%, var(--color-accent))",
    "var(--color-primary)",
  ],
};

type GithubCalendarProps = {
  username: string;
  profileUrl: string;
};

export default function GithubCalendar({ username, profileUrl }: GithubCalendarProps) {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);

  const years = useMemo(() => {
    const start = Math.max(currentYear - 6, 2008);
    return Array.from({ length: currentYear - start + 1 }, (_, i) => currentYear - i);
  }, [currentYear]);

  return (
    <article className="github-activity-panel rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <span className="whitespace-nowrap">Year</span>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="rounded-lg border border-[color-mix(in_srgb,var(--foreground)_12%,transparent)] bg-[color-mix(in_srgb,var(--surface,var(--background))_90%,transparent)] px-3 py-1.5 text-sm text-[var(--foreground)] outline-none transition-[border-color,box-shadow] focus-visible:border-[color-mix(in_srgb,var(--color-primary)_45%,transparent)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-primary)_35%,transparent)]"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center justify-center rounded-lg border border-[color-mix(in_srgb,var(--color-primary)_40%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-[background-color,border-color] hover:border-[color-mix(in_srgb,var(--color-primary)_55%,var(--color-border))] hover:bg-[color-mix(in_srgb,var(--color-primary)_18%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-primary)_45%,transparent)]"
        >
          View GitHub Profile
        </a>
      </div>

      <div className="mt-6 overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <div className="flex min-w-[720px] justify-center">
          <GHContributionCalendar
            username={username}
            year={year}
            theme={CONTRIBUTION_THEME}
            fontSize={12}
            blockSize={12}
            blockMargin={4}
            blockRadius={2}
            showWeekdayLabels
            showTotalCount
            className="[&_.react-activity-calendar]:max-w-none [&_svg]:text-[var(--muted)] [&_text]:fill-[var(--muted)]"
            labels={{
              totalCount: "{{count}} contributions in {{year}}",
            }}
          />
        </div>
      </div>
    </article>
  );
}

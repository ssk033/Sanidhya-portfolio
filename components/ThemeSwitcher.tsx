"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/providers";
import type { ThemeId } from "@/lib/theme";

const THEMES: {
  id: ThemeId;
  label: string;
  primary: string;
  secondary: string;
}[] = [
  { id: "purple-gold", label: "Purple & Gold", primary: "#a855f7", secondary: "#eab308" },
  { id: "ironMan", label: "Iron Man", primary: "#c1121f", secondary: "#d4af37" },
  { id: "captainAmerica", label: "Captain America", primary: "#1f3c88", secondary: "#b11226" },
  { id: "spiderMan", label: "Spider-Man", primary: "#c4161c", secondary: "#1f4fd8" },
  { id: "thor", label: "Thor", primary: "#3b82f6", secondary: "#d4af37" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        className="social-icon-btn flex size-10 shrink-0 cursor-default items-center justify-center rounded-xl text-[var(--foreground)] opacity-75"
        aria-label="Color theme"
      >
        <span className="flex h-5 w-5 gap-0.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
        </span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="social-icon-btn flex size-10 shrink-0 items-center justify-center rounded-xl text-[var(--foreground)]"
        aria-label="Color theme"
        aria-expanded={open}
        aria-haspopup="listbox"
        title={`Theme: ${current.label}`}
      >
        <span className="flex h-5 w-5 items-center justify-center gap-0.5">
          <span
            className="h-2.5 w-2.5 rounded-full border border-[var(--color-border)]"
            style={{ backgroundColor: current.primary }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full border border-[var(--color-border)]"
            style={{ backgroundColor: current.secondary }}
          />
        </span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute right-0 top-full z-20 mt-3 min-w-[14rem] max-h-[min(80vh,22rem)] overflow-y-auto rounded-xl border border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] bg-[color-mix(in_srgb,var(--background)_58%,transparent)] p-2 shadow-xl shadow-black/35 backdrop-blur-xl backdrop-saturate-150"
            role="listbox"
            aria-label="Select theme"
            onClick={(e) => e.stopPropagation()}
          >
            {THEMES.map((t) => {
              const active = theme === t.id;
              return (
              <button
                key={t.id}
                type="button"
                role="option"
                aria-selected={active}
                onClick={(e) => {
                  e.stopPropagation();
                  setTheme(t.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                  active
                    ? "bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)] text-[var(--foreground)] ring-1 ring-inset ring-[var(--color-primary)]/25"
                    : "text-[var(--foreground)] hover:bg-[color-mix(in_srgb,var(--foreground)_6%,transparent)]"
                }`}
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center gap-0.5">
                  <span
                    className="inline-block h-2 w-2 rounded-full border border-[var(--color-border)] shadow-sm"
                    style={{ backgroundColor: t.primary }}
                  />
                  <span
                    className="inline-block h-2 w-2 rounded-full border border-[var(--color-border)] shadow-sm"
                    style={{ backgroundColor: t.secondary }}
                  />
                </span>
                <span className="font-medium">{t.label}</span>
                {active && (
                  <span
                    className="ml-auto text-[var(--color-primary)]"
                    aria-hidden
                  >
                    ✓
                  </span>
                )}
              </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

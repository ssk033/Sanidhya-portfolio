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
        className="flex h-10 w-10 shrink-0 cursor-default items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--surface,var(--background))] opacity-80"
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
        className="social-icon-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--surface,var(--background))] text-[var(--foreground)]"
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
            className="absolute right-0 top-full z-20 mt-3 min-w-[13.5rem] max-h-[min(80vh,22rem)] overflow-y-auto rounded-2xl border border-[var(--color-border)] bg-[var(--surface,var(--background))] p-2 shadow-xl shadow-black/25 ring-1 ring-[var(--color-glow)] transition-[box-shadow] duration-300"
            role="listbox"
            aria-label="Select theme"
            onClick={(e) => e.stopPropagation()}
          >
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                role="option"
                aria-selected={theme === t.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setTheme(t.id);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-[var(--foreground)] transition-colors duration-200 hover:bg-[var(--color-hover-surface)]"
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
                {theme === t.id && (
                  <span
                    className="ml-auto text-[var(--color-accent)]"
                    aria-hidden
                  >
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const THEMES = [
  { id: "purple-gold", label: "Purple & Gold", primary: "#a855f7", secondary: "#eab308" },
  { id: "ironMan", label: "Iron Man", primary: "#C1121F", secondary: "#D4AF37" },
  { id: "captainAmerica", label: "Captain America", primary: "#1F3C88", secondary: "#B11226" },
  { id: "spiderMan", label: "Spider-Man", primary: "#C4161C", secondary: "#1F4FD8" },
  { id: "thor", label: "Thor", primary: "#3B82F6", secondary: "#D4AF37" },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

const STORAGE_KEY = "portfolio-theme";

const VALID_THEMES: ThemeId[] = ["purple-gold", "ironMan", "captainAmerica", "spiderMan", "thor"];

function getStoredTheme(): ThemeId {
  if (typeof window === "undefined") return "ironMan";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && VALID_THEMES.includes(stored as ThemeId)) return stored as ThemeId;
  return "ironMan";
}

function applyTheme(themeId: ThemeId) {
  const root = document.documentElement;
  root.setAttribute("data-theme", themeId);
  if (typeof document.body !== "undefined") {
    document.body.setAttribute("data-theme", themeId);
  }
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("ironMan");
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = getStoredTheme();
    setTheme(stored);
    applyTheme(stored);
    setMounted(true);
  }, []);

  const selectTheme = (themeId: ThemeId) => {
    applyTheme(themeId);
    localStorage.setItem(STORAGE_KEY, themeId);
    setTheme(themeId);
    setOpen(false);
  };

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  if (!mounted) {
    return (
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/30 bg-white/5"
        aria-label="Color theme"
      >
        <span className="flex h-5 w-5 gap-0.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#C1121F]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#D4AF37]" />
        </span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-[var(--primary-action)]/50 bg-[var(--primary-action)]/10 text-white/90 transition-colors hover:border-[var(--primary-action)] hover:bg-[var(--primary-action)]/25 hover:text-white"
        aria-label="Color theme"
        aria-expanded={open}
        aria-haspopup="listbox"
        title={`Theme: ${current.label}`}
      >
        <span className="flex h-5 w-5 items-center justify-center gap-0.5">
          <span
            className="h-2.5 w-2.5 rounded-full border border-white/40"
            style={{ backgroundColor: current.primary }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full border border-white/40"
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
            className="absolute right-0 top-full z-20 mt-2 min-w-[11rem] max-h-[80vh] overflow-y-auto rounded-lg border-2 border-[var(--border)] bg-[var(--surface,var(--background))] py-2 shadow-xl"
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
                  selectTheme(t.id);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--primary-action)]/10"
              >
                <span className="flex h-4 w-4 shrink-0 gap-0.5">
                  <span
                    className="inline-block h-2 w-2 rounded-full border border-white/30"
                    style={{ backgroundColor: t.primary }}
                  />
                  <span
                    className="inline-block h-2 w-2 rounded-full border border-white/30"
                    style={{ backgroundColor: t.secondary }}
                  />
                </span>
                <span>{t.label}</span>
                {theme === t.id && (
                  <span className="ml-auto text-[var(--accent-yellow)]">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

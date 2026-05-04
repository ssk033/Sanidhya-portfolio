export const THEME_STORAGE_KEY = "portfolio-theme";

export const VALID_THEME_IDS = [
  "purple-gold",
  "ironMan",
  "captainAmerica",
  "spiderMan",
  "thor",
] as const;

export type ThemeId = (typeof VALID_THEME_IDS)[number];

export const DEFAULT_THEME_ID: ThemeId = "purple-gold";

export function isThemeId(value: string | null | undefined): value is ThemeId {
  if (value == null) return false;
  const t = value.trim();
  return VALID_THEME_IDS.includes(t as ThemeId);
}

/** Applies theme to `document.documentElement` (and body when available). */
export function applyThemeToDocument(themeId: ThemeId) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", themeId);
  document.body?.setAttribute("data-theme", themeId);
}

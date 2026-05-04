# my-portfolio — project documentation

Personal portfolio site for **Sanidhya Singh** (Full Stack Developer & CSE undergrad, Bengaluru). Single-page layout: **hero** (profile + skills subset), **projects**, **achievements**, **footer**. There is **no separate Skills section** below the hero — skills pills live only inside the hero (first **12** entries from `SKILLS`).

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | **Next.js 16** (App Router), static pages where applicable |
| UI | **React 19**, **TypeScript 5** |
| Styling | **Tailwind CSS v4** (`@import "tailwindcss"` in `app/globals.css`), PostCSS |
| Fonts | **Geist Sans** & **Geist Mono** via `next/font/google` |
| Utilities | **clsx**, **tailwind-merge** (`cn()` in `lib/utils.ts`) |
| Animation lib | **motion** (installed; used where components need it) |
| Lint | **ESLint** with `eslint-config-next` |

---

## Repository layout

```
app/
  layout.tsx      # Root HTML, fonts, blocking theme script, Providers
  page.tsx        # Entire portfolio UI (home only)
  globals.css     # Theme tokens per data-theme, components, keyframes

components/
  providers/      # ThemeProvider + barrel export
  portfolio/      # SectionHeading
  icons/          # CSS3Logo (Simple Icons CDN has no CSS3 slug workaround)
  ui/             # GridBackground, Loader, IconCloud (optional / demos), cards, beams
  ProjectCard.tsx, ThemeSwitcher.tsx, LivePreviewThumbnail.tsx, …

lib/
  theme.ts        # Theme IDs, localStorage key, applyThemeToDocument
  utils.ts        # cn()

public/
  iron-man.jpg    # Profile image
  *.svg           # Default Next assets (optional use)
```

**Notes**

- `components/*-demo.tsx` — UI kit demos / experiments.
- **`IconCloud`** (`components/ui/icon-cloud.tsx`) remains in the repo (subtle canvas tuning possible) but is **not imported on the home page**; hero skills use pills instead.

---

## Runtime & scripts

- `npm run dev` — Next dev server  
- `npm run build` — Production build  
- `npm run start` — Serve built app  
- `npm run lint` — ESLint  

`next.config.ts` is minimal (default options placeholder).

---

## Routing & SEO

- **Routes:** `/` (home), `/_not-found` (Next default).  
- **Metadata** (`app/layout.tsx`): title *“Sanidhya Singh | Web Developer & Figma Designer”*, description mentions React, TypeScript, Next.js, Node, Bengaluru.

---

## Theming system (detail)

### Storage & hydration

- **Key:** `portfolio-theme` (`THEME_STORAGE_KEY` in `lib/theme.ts`).  
- **Valid IDs:** `purple-gold`, `ironMan`, `captainAmerica`, `spiderMan`, `thor`.  
- **Default:** `purple-gold`.

**Flash prevention:** `layout.tsx` injects an inline **blocking** `<script>` in `<head>` that reads `localStorage`, validates against the allowlist, and sets `document.documentElement.setAttribute("data-theme", …)` before paint. Invalid or missing values fall back to `purple-gold`.

**Client sync:** `ThemeProvider` runs `useEffect` on mount, reads the same key, updates React state, and calls `applyThemeToDocument` (sets `data-theme` on `<html>` and `<body>`).

### CSS variables

Each `html[data-theme="…"]` block in `globals.css` defines:

- Surfaces: `--background`, `--foreground`, `--muted`, `--surface`  
- Brand: `--color-primary`, `--color-accent`, `--color-glow`, `--color-border`, `--color-hover`, `--color-hover-surface`  
- Legacy aliases: `--accent-yellow`, `--accent-purple`, `--primary-action`, `--border`, `--role-color`, `--card-glow`  
- UI tokens: `--grid-line`, `--skill-glow`, `--skill-glow-sub`, loader colors  

Components use these via Tailwind arbitrary values, e.g. `bg-[var(--background)]`, `text-[var(--muted)]`.

### Theme switcher UI

`ThemeSwitcher.tsx`: dropdown next to social icons in the hero; shows primary/secondary swatches per theme; uses `useTheme()`; SSR-safe placeholder until `mounted`.

---

## Page structure (`app/page.tsx`)

### Content density

Tighter **`main`** rhythm (`space-y-12` / `md:space-y-14`, `py-8` / `md:py-11`). Sections after hero use **`pt-12` / `md:pt-14`** top borders.

### Constants

- **`LINKS`** — GitHub, LinkedIn, X, Instagram, project repos + live URLs.  
- **`PROJECTS`** — `ProjectCardProps[]`; mapped to `<ProjectCard />`. Both entries use **`livePreviewStyle: "thumbnail"`** (WordPress mshots via `LivePreviewThumbnail`).  
- **`SKILLS`** — `{ name, icon, color? }[]`; icons from **`SKILL_ICON_BASE`** (`cdn.simpleicons.org`). Hero shows **`SKILLS.slice(0, 12)`** only.

### 1. Shell

`min-h-screen` + fixed **`GridBackground`** (`z-0`); **`main`** `relative z-10 max-w-5xl`.

### 2. Hero

- **Grid:** `grid grid-cols-1 md:grid-cols-2 gap-10 items-center`.  
- **Left:** Avatar (`next/image`, `/iron-man.jpg`), name, role, location, email/phone, short bio, social icons + `ThemeSwitcher`.  
- **Right:** Elevated **`aside`** (rounded border, blur, surface tint) with heading **“Skills”** and a **compact grid** `grid-cols-2 md:grid-cols-3 gap-3`. Each cell reuses the **same pill pattern** as before: **`skill-btn`** + icon (`CSS3Logo` for CSS, else `<img>` from Simple Icons) + label — **no second skills section** elsewhere on the page.

### 3. Projects

- **`SectionHeading`** “Projects”.  
- **`grid grid-cols-1 md:grid-cols-2`** `gap-6` / `lg:gap-8`, **`items-stretch`**.  
- One **`ProjectCard`** per **`PROJECTS`** entry.

### 4. Achievements & More

Two **`portfolio-card`** columns (achievements list + extra info).

### 5. Footer

Copyright + **`Loader`**; compact padding.

---

## Projects (`components/ProjectCard.tsx`)

Composable layout (same props **`ProjectCardProps`** exported for **`PROJECTS`** typing):

| Piece | Role |
|-------|------|
| **`ProjectCardShell`** | Outer article: border, glassy bg, hover lift |
| **`ProjectCardHeading`** | Title only (preview sits directly under heading) |
| **`ProjectCardPreview`** | Thumbnail / iframe / fallback; wrapper `rounded-2xl`, `border-white/10`, soft glow; hover scale ~**1.02** |
| **`ProjectCardContent`** | Problem + description (**`text-justify [text-align-last:left]`**), tech pills, up to **3** feature bullets, **`<details>`** with full keyFeatures + myRole, GitHub + Live buttons |
| **Default `ProjectCard`** | Vertical stack: heading → preview → content; **`h-full`** for grid column stretch |

Live previews default to **`LivePreviewThumbnail`** when `livePreviewStyle === "thumbnail"` (see `LivePreviewThumbnail.tsx`, optional **`imgClassName`**).

---

## Background (`components/ui/grid-background.tsx` + `globals.css`)

Fixed, non-interactive, **six stacked layers** (`z-[1]` … `z-[6]`, root **`isolate`**):

1. **`.page-bg-base-layer`** — Deep **`to bottom right`** gradient + theme tint; slow **`page-bg-gradient-drift`** (~26s); respects **`prefers-reduced-motion`**.  
2. **Radial blobs** — Primary / accent, large blur, slow drift (~29s / ~31s).  
3. **`.page-bg-mid-light`** — Soft center lift (low white alpha).  
4. **`.grid-bg-lines`** — **`--grid-line-paint`**; thin lines + radial mask optional.  
5. **`.page-bg-vignette`** — Edge darkening.  
6. **`.page-bg-noise`** — Grain, **`mix-blend-mode: overlay`**, ~5% opacity.

---

## Styling highlights (`globals.css`)

- **`@theme inline`** — Tailwind color tokens from CSS variables.  
- **`.portfolio-card`**, **`.social-icon-btn`**, **`.skill-btn`**, **`.text-gradient`**, **`.name-scale`**, **Loader** (`.loader-frame`).  
- Page backdrop utilities as above.

Reduced-motion rules tone down card/skill/background motion where relevant.

---

## Notable components (short)

| File | Role |
|------|------|
| `ProjectCard.tsx` | Split exports + default card; thumbnail-first layout |
| `LivePreviewThumbnail.tsx` | External screenshot preview + optional `imgClassName` |
| `components/ui/grid-background.tsx` | Layered backdrop |
| `components/ui/icon-cloud.tsx` | Canvas globe (**not used on home**; demos / reuse) |
| `components/ui/loader.tsx` | Footer decorative loader |
| `SectionHeading.tsx` | Section titles + accent bar |

---

## Path alias

`tsconfig.json` maps `@/*` to the project root.

---

## Security / privacy notes

- Email and phone are **hardcoded** in `page.tsx`.  
- External links use `rel="noopener noreferrer"` where applicable.

---

## Extending the project

- **New theme:** `VALID_THEME_IDS` + `layout.tsx` script allowlist + `globals.css` block + `ThemeSwitcher` list.  
- **More hero skills:** Adjust **`SKILLS.slice(0, 12)`** or restore a dedicated section if you want the full **16** visible twice.  
- **New project:** Append to **`PROJECTS`** + **`LINKS`** as needed.

---

## Related files

- `README.md` — may lag behind this doc.  
- `SHADCN-SETUP.md` — shadcn-style notes if adding primitives.

---

## Maintainer notes

- **`package.json`** must be valid JSON (no stray characters before `{`).

---

*Last updated: hero skills pills (subset of `SKILLS`), no duplicate skills section; projects grid + `ProjectCard` vertical layout; both projects use thumbnail previews; six-layer background unchanged at a high level.*

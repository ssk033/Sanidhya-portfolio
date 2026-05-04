# my-portfolio — project documentation

Personal portfolio site for **Sanidhya Singh** (Full Stack Developer & CSE undergrad, Bengaluru). Single-page layout: **hero** (profile + skills subset), **projects**, **GitHub activity**, **achievements**, **footer**. There is **no separate Skills section** below the hero — skills pills live only inside the hero (first **12** entries from `SKILLS`).

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | **Next.js 16** (App Router), static pages where applicable |
| UI | **React 19**, **TypeScript 5** |
| Styling | **Tailwind CSS v4** (`@import "tailwindcss"` in `app/globals.css`), PostCSS |
| Fonts | **Geist Sans** & **Geist Mono** via `next/font/google`; **Playfair Display** loaded on `<body>` for **Rajputana** heading typography (applied via `globals.css` when `data-theme="rajputana"`) |
| Utilities | **clsx**, **tailwind-merge** (`cn()` in `lib/utils.ts`) |
| Animation lib | **motion** (installed; used where components need it) |
| GitHub heatmap | **react-github-calendar** (client fetch; see `components/GithubCalendar.tsx`) |
| Lint | **ESLint** with `eslint-config-next` |

---

## Repository layout

```
app/
  layout.tsx      # Root HTML, fonts, blocking theme script, Providers
  page.tsx        # Entire portfolio UI (home only)
  globals.css     # Theme tokens per data-theme, backdrop, cards, Rajputana overlays

components/
  providers/      # ThemeProvider + barrel export
  portfolio/      # SectionHeading
  icons/          # CSS3Logo (Simple Icons CDN has no CSS3 slug workaround)
  ui/             # GridBackground, Loader, IconCloud (optional / demos), cards, beams
  ProjectCard.tsx, ThemeSwitcher.tsx, GithubCalendar.tsx, LivePreviewThumbnail.tsx, …

lib/
  theme.ts        # Theme IDs, localStorage key, applyThemeToDocument
  utils.ts        # cn()

public/
  iron-man.jpg    # Profile image
  *.svg           # Default Next assets (optional use)
```

**Notes**

- `components/*-demo.tsx` — UI kit demos / experiments.
- **`IconCloud`** (`components/ui/icon-cloud.tsx`) remains in the repo but is **not imported on the home page**; hero skills use pills instead.

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
- **Valid IDs:** `purple-gold`, `ironMan`, `spiderMan`, **`rajputana`**. Any **`localStorage`** value not in this list (including legacy IDs) falls back to **`purple-gold`** via the head script and `ThemeProvider`. No migration script required.  
- **Default:** `purple-gold`.

**Flash prevention:** `layout.tsx` injects an inline **blocking** `<script>` in `<head>` that reads `localStorage`, validates against the **same allowlist** as `VALID_THEME_IDS`, and sets `document.documentElement.setAttribute("data-theme", …)` before paint. Invalid or missing values fall back to `purple-gold`.

**Client sync:** `ThemeProvider` runs `useEffect` on mount, reads the same key, updates React state, and calls `applyThemeToDocument` (sets `data-theme` on `<html>` and `<body>`).

Keep **`layout.tsx` script array** and **`VALID_THEME_IDS`** in sync whenever you add or remove a theme.

### CSS variables

Each `html[data-theme="…"]` block in `globals.css` defines:

- Surfaces: `--background`, `--foreground`, `--muted`, `--surface`  
- Brand: `--color-primary`, `--color-accent`, `--color-glow`, `--color-border`, `--color-hover`, `--color-hover-surface`  
- **Rajputana only:** `--color-secondary-accent` (saffron), **`--card-glow`** (distinct maroon-tinted glow for cards, alongside `--color-glow` gold aura)  
- Legacy aliases: `--accent-yellow`, `--accent-purple`, `--primary-action`, `--border`, `--role-color`, `--card-glow` (themes map this where useful)  
- UI tokens: `--grid-line`, `--skill-glow`, `--skill-glow-sub`, loader colors  

Components use these via Tailwind arbitrary values, e.g. `bg-[var(--background)]`, `text-[var(--muted)]`.

### Rajputana (“premium royal”) theme

When **`data-theme="rajputana"`**:

- **Palette:** deep brown/black background (`#0f0b08`), warm surface (`#1c120d`), ivory text (`#f5e6c8`), muted gold (`#c2a878`), royal maroon primary (`#8b0000`), antique gold accent (`#d4af37`), saffron secondary accent (`#ff9933`).  
- **Typography:** body **`letter-spacing: 0.02em`**; **Playfair Display** for `h1`–`h6`.  
- **Background:** dedicated base stack (see **Background** below): strong maroon/saffron radials + **135deg** wash, larger blobs with **`filter: blur(120px)`** and higher opacity, **royal spotlight** centre aura (gold radial — **hidden** outside Rajputana), boosted grid, and accent-tuned **`.page-bg-light-sweep`**.  
- **Hero hooks:** **`portfolio-hero-avatar`** (gold ring, glow, vignette), **`portfolio-hero-skills-panel`** (layered “palace panel” + faint diagonal texture — CSS only, no images).  
- **Sections / cards:** **`portfolio-section-heading`** section titles get gradient gold–ivory treatment; **`portfolio-card`** and **`project-premium-shell`** get layered gradients, gold borders, restrained hover lift/glow; **`github-activity-panel`** matches the warm card language.  
- **Project actions:** under Rajputana, GitHub / Live links use **outline gold** buttons that **fill gold on hover** with dark text (`globals.css` targets **`.project-premium-actions a`**).

Non-Rajput themes (**purple-gold**, **ironMan**, **Spider-Man**) still use the same **layered** backdrop system (corner radials + deeper base, stronger blobs, sweep, vignette, noise) with **theme tokens** (`--color-primary` / `--color-accent` / `--grid-line`); Rajputana adds the **spotlight** layer and the specified **fixed hex** base wash.

### Theme switcher UI

`ThemeSwitcher.tsx`: dropdown next to social icons in the hero; shows primary/secondary swatches per theme (**Rajputana:** maroon + gold dots); uses `useTheme()`; SSR-safe placeholder until `mounted`.

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
- **Left:** Avatar wrapper **`portfolio-hero-avatar`** (`next/image`, `/iron-man.jpg`), name (**gradient styling under Rajputana** via **`profile-name-gloss`**), role, location, email/phone, short bio (**justified** copy with **`text-justify [text-align-last:left]`**), social icons + `ThemeSwitcher`.  
- **Right:** **`aside`** with **`portfolio-hero-skills-panel`** — rounded border, blur, surface tint; heading **“Skills”**; **compact grid** `grid-cols-2 md:grid-cols-3 gap-3`. Each cell uses **`skill-btn`** + icon (`CSS3Logo` for CSS, else `<img>` from Simple Icons) + label — **no second skills section** elsewhere.

### 3. Projects

- **`SectionHeading`** “Projects” (wrapper **`portfolio-section-heading`**).  
- **`grid grid-cols-1 md:grid-cols-2`** `gap-6` / `lg:gap-8`, **`items-stretch`**.  
- One **`ProjectCard`** per **`PROJECTS`** entry.

### 4. GitHub Activity

- **`SectionHeading`** “GitHub Activity”.  
- **`GithubCalendar`** (`username` **ssk033**, `profileUrl` from **`LINKS.github`**): year selector, contribution heatmap (**react-github-calendar**), total count, **View GitHub Profile** CTA; wrapper **`github-activity-panel`**; horizontal scroll on narrow viewports (**`overflow-x-auto`** + inner min-width).

### 5. Achievements & More

Two **`portfolio-card`** columns (achievements list + extra info).

### 6. Footer

Copyright + **`Loader`**; compact padding.

---

## Projects (`components/ProjectCard.tsx`)

Composable layout (same props **`ProjectCardProps`** exported for **`PROJECTS`** typing):

| Piece | Role |
|-------|------|
| **`ProjectCardShell`** | Outer **`article`** with class **`project-premium-shell`**: border, glassy bg, hover lift; Rajputana overrides in **`globals.css`** |
| **`ProjectCardHeading`** | Title only (preview sits directly under heading) |
| **`ProjectCardPreview`** | Thumbnail / iframe / fallback; wrapper includes **`project-premium-preview`** + inner **`project-premium-preview-inner`**; hover scale driven from **`globals.css`** (**~1.02**, **~1.015** on Rajputana) — **`prefers-reduced-motion`** disables transform |
| **`ProjectCardContent`** | Problem + description (**`text-justify [text-align-last:left]`**), tech pills, up to **3** feature bullets, **`<details>`** with full keyFeatures + myRole; actions in **`project-premium-actions`** |
| **Default `ProjectCard`** | Vertical stack: heading → preview → content; **`h-full`** for grid column stretch |

Live previews default to **`LivePreviewThumbnail`** when `livePreviewStyle === "thumbnail"` (see `LivePreviewThumbnail.tsx`, optional **`imgClassName`**).

---

## GitHub calendar (`components/GithubCalendar.tsx`)

- Client component (**`"use client"`**): fetches contribution data via the library’s default API.  
- **`CONTRIBUTION_THEME`** maps heat levels using **`var(--color-primary)`**, **`var(--color-accent)`**, and mixes with **`--background` / `--foreground`** so the chart tracks the active theme.  
- Card chrome aligns with portfolio tokens; Rajputana picks up **`github-activity-panel`** styling from **`globals.css`**.

---

## Background (`components/ui/grid-background.tsx` + `globals.css`)

Fixed, non-interactive **stacked backdrop** (**`z-[1]` … `z-[7]`**, root **`isolate`**). Motion uses **`transform`** on blobs and **`background-position`** animation on the base layer/sweep (**GPU-friendly**); **no bitmap backgrounds**.

| Layer | Class / role |
|-------|----------------|
| 1 | **`.page-bg-base-layer`** — **All themes:** corner **radials** (primary/accent tinted) + **132deg** linear wash for deeper contrast; **`page-bg-gradient-drift`** (~26s). **Rajputana:** fixed stack — `radial-gradient` maroon TL + saffron TR + **`linear-gradient(135deg, #0f0b08 → #1a0f0a → #0f0b08)`** per spec. |
| 2 | **`.page-bg-glow-blob-*`** + **`page-bg-glow-primary-fill` / `page-bg-glow-accent-fill`** — Large ellipses; **`filter: blur(120px)`** and **opacity from CSS** (default ~**0.3** / **0.26**; Rajputana **~0.44** / **~0.39**). Slow drift keyframes (**`prefers-reduced-motion`** disables drift). |
| 3 | **`.page-bg-mid-light`** — Centre lift (+ Rajput warm halos when Rajputana). |
| 3b | **`.rajput-bg-center-aura`** — **Rajputana only:** strong **gold spotlight** (`circle at center`; stepped alpha **0.18 → 0.10 → transparent**); **`opacity: 0`** otherwise. |
| 4 | **`.grid-bg-lines`** — **`--grid-line-paint`** mixes **`--grid-line`** with accent; **mask** favours readability **centre → edges**. Base opacity in JSX **~0.17 / 0.22** (sm). **Rajputana:** paint leans **`rgba(212,175,55,0.12)`** + saffron/gold mix, opacity **~0.18**. |
| 5 | **`.page-bg-light-sweep`** — **Accent-tinted** linear band, **`mix-blend-mode: soft-light`**, **`background-position` animation** (~26s alternate). Rajput band uses **`rgba(212,175,55,0.08)`**. Very subtle “life” without flash. **`prefers-reduced-motion`** disables animation. |
| 6 | **`.page-bg-vignette`** — Stronger edge falloff; **warm brown** mix (**Rajputana:** dedicated brown edge alpha). |
| 7 | **`.page-bg-noise`** — SVG fractal grain; **`soft-light`**, opacity **~7%** (**Rajputana ~7.5%**). |

---

## Styling highlights (`globals.css`)

- **`@theme inline`** — Tailwind color tokens from CSS variables.  
- **`.portfolio-card`**, **`article.project-premium-shell`**, **`.social-icon-btn`**, **`.skill-btn`**, **`.text-gradient`**, **`.name-scale`**, Loader (`.loader-frame`).  
- **Card vs backdrop:** **`portfolio-card`** and **`project-premium-shell`** use **`backdrop-filter: blur`** (where already applied) plus **tinted borders** from **`--color-border`** and **idle `box-shadow`** that includes a faint **`--card-glow`** wash so panels read **separate** from the backdrop; **hover** states add stronger **`--color-glow`** (glow hierarchy: background < card idle < hover).  
- **Rajputana:** heading gradients, hero panel/avatar, **`project-premium-*`**, **`github-activity-panel`**, warm palette throughout.  
- Page backdrop utilities as in the table above.

Reduced-motion rules tone down card/skill/background motion where relevant (including **`.page-bg-light-sweep`**).

---

## Notable components (short)

| File | Role |
|------|------|
| `ProjectCard.tsx` | Split exports + default card; **`project-premium-*`** hooks for theme-aware styling |
| `GithubCalendar.tsx` | GitHub contribution heatmap + year + profile link |
| `LivePreviewThumbnail.tsx` | External screenshot preview + optional `imgClassName` |
| `components/ui/grid-background.tsx` | Layered backdrop + Rajput center aura layer |
| `components/ui/icon-cloud.tsx` | Canvas globe (**not used on home**; demos / reuse) |
| `components/ui/loader.tsx` | Footer decorative loader |
| `SectionHeading.tsx` | Section titles + accent bar (**`portfolio-section-heading`** wrapper) |

---

## Path alias

`tsconfig.json` maps `@/*` to the project root.

---

## Security / privacy notes

- Email and phone are **hardcoded** in `page.tsx`.  
- External links use `rel="noopener noreferrer"` where applicable.  
- GitHub calendar uses a **third-party contributions API** (bundled with **`react-github-calendar`**); no iframe embed for the heatmap.

---

## Extending the project

- **New theme:** `VALID_THEME_IDS` + **`layout.tsx` script allowlist** + `globals.css` `html[data-theme="…"]` block + `ThemeSwitcher` list.  
- **More hero skills:** Adjust **`SKILLS.slice(0, 12)`** or restore a dedicated section if you want the full **16** visible twice.  
- **New project:** Append to **`PROJECTS`** + **`LINKS`** as needed.

---

## Related files

- `README.md` — may lag behind this doc.  
- `SHADCN-SETUP.md` — shadcn-style notes if adding primitives.

---

## Maintainer notes

- **`package.json`** must be valid JSON (no stray characters before `{`).
- **`layout.tsx` theme script** and **`lib/theme.ts`** allowlists must stay aligned.

---

*Last updated: Legacy themes dropped from allowlists (storage falls back to **`purple-gold`**). **Premium backdrop:** richer base (all themes), stronger blobs (`blur(120px)`), Rajput royal spotlight + spec base gradient, boosted grid + **`.page-bg-light-sweep`**, warmer vignette + noise; **`z-[1]`–`z-[7]`** stack. Cards: clearer separation from backdrop via border+tint + idle **`--card-glow`**. Else unchanged: Rajputana, GitHub calendar, Playfair headings, semantic hooks.*

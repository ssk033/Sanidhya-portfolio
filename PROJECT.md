# my-portfolio — project documentation

Personal portfolio site for **Sanidhya Singh** (Full Stack Developer & CSE undergrad, Bengaluru). Single-page marketing layout: hero, skills, projects, achievements, footer.

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
  ui/             # GridBackground, IconCloud, Loader, cards, beams, etc.
  ProjectCard.tsx, ThemeSwitcher.tsx, LivePreviewThumbnail.tsx, …

lib/
  theme.ts        # Theme IDs, localStorage key, applyThemeToDocument
  utils.ts        # cn()

public/
  iron-man.jpg    # Profile image
  *.svg           # Default Next assets (optional use)
```

**Note:** `components/*-demo.tsx` files look like UI kit demos / experiments alongside production components.

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

`ThemeSwitcher.tsx`: dropdown next to social icons; shows primary/secondary swatches per theme; uses `useTheme()`; SSR-safe placeholder button until `mounted` to avoid hydration mismatch.

---

## Layout & content density (`app/page.tsx`)

The page is tuned for **less vertical scrolling** while staying readable: tighter **`main`** rhythm (`space-y-12` / `md:space-y-14`, `py-8` / `md:py-11`), section dividers with **`pt-12` / `md:pt-14`** instead of very large top padding, and slightly smaller type in the hero where it was oversized.

1. **Shell:** `min-h-screen` wrapper + fixed full-viewport layer for `GridBackground` (`z-0`), **`main` at `z-10`** (`max-w-5xl`, horizontal padding unchanged in spirit).  
2. **Hero (grid):** On **`md+`**, `min-h-[68vh]` helps the hero occupy most of the viewport so the first screen can show **hero + start of Skills**. Left — circular `next/image` (`/iron-man.jpg`, **`sizes="144px"`**, `priority`), compact avatar (`h-36 w-36`, `md:h-40 md:w-40`), reduced gaps between name → subtitle → location → contact → bio → socials; heading scale **`text-4xl` / `md:text-5xl`**. Right — **`IconCloud`** with Simple Icons CDN URLs and **max height/width caps** so the sphere does not dominate the column.  
3. **Skills:** `SectionHeading` + 8-column grid with **tighter `gap-x` / `gap-y`**; pills use **`px-3 py-1.5`**, smaller icons/text; `getSkillColClass` unchanged.  
4. **Projects:** **`gap-6`** (and modest `lg` bump); **`mt-9`** after heading; trailing spacer **`h-8`**.  
5. **Achievements & More:** Two **`portfolio-card`** blocks with **`p-6`**, **`space-y-2`** bullets, tighter headers and secondary copy.  
6. **Footer:** **`pt-8 pb-6`**, **`gap-4`**.

Constants **`LINKS`** centralize GitHub, LinkedIn, X, Instagram, and project repo/live URLs.

---

## Background (`components/ui/grid-background.tsx` + `globals.css`)

Fixed, non-interactive, **six stacked layers** (`z-[1]` … `z-[6]`, root **`isolate`**):

1. **`.page-bg-base-layer`** — **`linear-gradient(to bottom right, …)`** from dark mixes of `--background` / `--surface` into a corner tinted with **`color-mix(..., var(--color-primary) ~7%, …)`**. Slow **`page-bg-gradient-drift`** (~**26s**) via oversized `background-size` + `background-position`; disabled under **`prefers-reduced-motion`**.  
2. **Radial blobs** — Large blurred ellipses (**primary** top-left, **accent** bottom-right); **higher opacity** (~0.18–0.22 range) and **heavy blur** (~132–142px); radial cores use stronger `color-mix` stops. Separate slow **translate/scale** animations (**~29s / ~31s**); disabled when reduced motion.  
3. **`.page-bg-mid-light`** — Soft centered **`radial-gradient`** with very low **white** alpha (~**3%**) so the middle does not read flat.  
4. **`.grid-bg-lines`** — Uses **`--grid-line-paint`**: mix of **`var(--grid-line)`** and extra **`var(--color-primary)`** for theme-linked lines; **0.5px** strokes; layer opacity ~**0.13–0.17**; optional **`--page-grid-mask`** radial fade (edges fall off).  
5. **`.page-bg-vignette`** — Elliptical **darkening toward edges** (`transparent` → **`rgba(0,0,0,0.4)`**) for depth; sits **above** grid, **below** noise.  
6. **`.page-bg-noise`** — SVG **`feTurbulence`** tile, **`mix-blend-mode: overlay`**, opacity ~**5%**.

Grid painting and ambient layers live in **`globals.css`**; JSX wires masks and blob inline gradients where CSS variables are needed.

---

## Styling highlights (`globals.css`)

- **`@theme inline`** maps `--color-background` / `--color-foreground` to CSS variables for Tailwind.  
- **`.portfolio-card`** — glass-like card: gradient tint, blur, hover lift/shadow/glow.  
- **`.social-icon-btn`** — icon buttons for social + theme trigger.  
- **`.text-gradient`** — accent → primary text gradient utility.  
- **`.skill-btn`** — pill hover scale/glow.  
- **`.name-scale` / `.group\/name:hover`** — profile name hover polish.  
- **Loader** — complex SVG/CSS keyframes under `.loader-frame`.  
- **Page backdrop** — classes documented in the Background section: base layer, blob keyframes, mid-light, vignette, noise, and **`--grid-line-paint`** inside **`.grid-bg-lines`**.

Reduced-motion media queries tone down transforms on cards, social buttons, skills, and background animations.

---

## Notable components (short)

| File | Role |
|------|------|
| `ProjectCard.tsx` | Project story blocks; GitHub/live links; optional `LivePreviewThumbnail` or iframe preview; **compact padding (`p-6`)** and tighter header/body spacing |
| `components/ui/icon-cloud.tsx` | 3D-ish floating icon sphere (client component); canvas **400×400**; parent on `page.tsx` constrains visual size |
| `components/ui/loader.tsx` | Animated loader used in footer |
| `SectionHeading.tsx` | Shared section titles; **smaller heading scale** and tighter gap under title |
| `background-beams-with-collision.tsx`, `evervault-card.tsx`, `3d-card.tsx` | Rich UI primitives (may be used in demos or future sections) |

---

## Path alias

`tsconfig.json` maps `@/*` to the project root (typical Next + TypeScript setup).

---

## Security / privacy notes (for maintainers)

- Email and phone are **hardcoded** in `page.tsx` — fine for a public portfolio; avoid committing secrets elsewhere.  
- External links use `rel="noopener noreferrer"` where applicable.

---

## Extending the project

- **New theme:** Add ID to `VALID_THEME_IDS` + `layout.tsx` inline script array + new `html[data-theme="…"]` block in `globals.css` + entry in `ThemeSwitcher` `THEMES` array.  
- **New section:** Add a `<section>` in `page.tsx` with `SectionHeading` and reuse `portfolio-card` / grid patterns.  
- **New project:** Duplicate `ProjectCard` with new `LINKS` entries.

---

## Related files in repo

- `README.md` — default Next starter blurb (may be outdated vs actual site).  
- `SHADCN-SETUP.md` — notes from shadcn-style setup if you add more UI primitives.

---

## Maintainer notes

- **`package.json`** must be strict JSON (no stray characters before the opening `{`); invalid JSON breaks `npm run dev` / `npm run build`.

---

*Last updated to match the six-layer background, grid paint token, and denser page spacing. Revise when adding routes, CMS, or deployment-specific config.*

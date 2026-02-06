# shadcn/ui & 3D Card Setup

## Current project verification

| Requirement      | Status | Notes                                      |
|------------------|--------|--------------------------------------------|
| **Tailwind CSS v4** | ✅     | `tailwindcss: ^4`, `@tailwindcss/postcss: ^4` in package.json |
| **TypeScript**   | ✅     | tsconfig.json with `@/*` → `./*`           |
| **shadcn/ui structure** | ⚠️ Partial | No `components.json`; `components/ui` and `lib/utils` were added manually for the 3D card |

## Default paths

- **Components:** `components/` with UI primitives in `components/ui/`
- **Styles:** `app/globals.css` (Tailwind v4 with `@import "tailwindcss"`)
- **Utils:** `lib/utils.ts` (e.g. `cn()` for class names)

## Why use `components/ui`?

Using a dedicated `components/ui` folder:

1. Keeps reusable UI primitives (e.g. 3d-card, buttons, dialogs) in one place.
2. Matches common Next.js + shadcn patterns so copy-pasted components and docs “just work.”
3. Makes it clear which components are generic UI building blocks vs. page-specific sections.

If your project did not have `components/ui`, creating it and putting shared components there is recommended for the reasons above.

## Optional: full shadcn/ui init

To use the official shadcn CLI and add more components later:

```bash
npx shadcn@latest init
```

- Choose **New York** or **Default** style as you prefer.
- Base color: any (e.g. **Slate**).
- CSS variables: **Yes**.
- Tailwind config: the CLI will detect Tailwind v4 and adjust.
- Components path: **`components/ui`** (recommended).
- Utils path: **`lib/utils`** (already present).
- `components.json`: **Yes**.
- React Server Components: **Yes** (default for App Router).
- Write config to `components.json`: **Yes**.

Then add components with:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
# etc.
```

## 3D card usage

- **Primitive:** `components/ui/3d-card.tsx` — exports `CardContainer`, `CardBody`, `CardItem`, `useMouseEnter`.
- **Demo:** `components/3d-card-demo.tsx` — example 3D card (e.g. for a dedicated demo page).
- **Project cards:** `components/ProjectCard.tsx` — uses the 3D card for each portfolio project; used in `app/page.tsx`.

Project cards on the homepage now use the same 3D hover effect (perspective + mouse-follow rotation) as the demo.

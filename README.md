# WE Healthcare - Web

Front-end scaffold for a premium, trust-first US teleradiology website.
Visual/UX quality is inspired by [vrad.com](https://www.vrad.com/) as a
category reference; no vRad branding, copy, or assets are used.

**Status:** Navbar and Hero are implemented. All other landing page sections
(Services, Solutions, About, Resources, Careers, Contact, etc.) are not
built yet - their nav links point to placeholder routes that intentionally
404 until those pages exist.

## Stack

- **Next.js 16** (App Router, `src/` layout, Turbopack dev)
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first `@theme` config, no `tailwind.config.js`)
- **Motion** (`motion/react`, the Framer Motion successor) + **GSAP / ScrollTrigger** for scroll-driven work
- **next-themes** for light/dark theming
- **@phosphor-icons/react** for icons
- **@radix-ui/react-navigation-menu** for the accessible desktop nav dropdowns (keyboard nav, focus management, ARIA come from Radix)
- **class-variance-authority**, **clsx**, **tailwind-merge** for variant-driven, conflict-safe styling

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint (eslint-config-next, flat config)
```

## Project structure

```
src/
  app/                        Routes (App Router). One folder per URL.
    layout.tsx                Fonts, ThemeProvider, SiteHeader + SiteFooter (every page)
    page.tsx                  Home - composes components/sections/home/*
    not-found.tsx             404
    services/                 /services hub + [slug]/ (from content/services.ts)
    modalities/               /modalities hub + [slug]/ (from content/modalities.ts)
    who-we-serve/             /who-we-serve hub + [slug]/ (from content/audiences.ts)
    technology/               hub + pacs-ris-integration, dicom-workflow, ...
    quality/                  hub + radiologists, quality-control, ...
    resources/                hub + insights, case-studies, faqs, ...
    about/                    hub + our-approach, leadership
    contact/  request-a-demo/
    (legal)/                  privacy, terms, cookies (route group - no URL segment)
  components/
    ui/                       Generic primitives (Button, Container, Toggle, navigation-menu)
    layout/                   Global chrome: site-header.tsx, site-footer.tsx
    shared/                   Blocks reused across pages (page-placeholder.tsx)
    sections/<page>/          Sections owned by one page: home/, services/, modalities/,
                              who-we-serve/, technology/, quality/, resources/, about/, contact/
    providers/                Client-boundary providers (ThemeProvider)
  config/
    routes.ts                 Every internal URL - import instead of hard-coding paths
    navigation.ts             Navbar/footer menu (single source of truth)
    site.ts                   Site name, description, CTAs
  content/                    Data behind [slug] pages (services, modalities, audiences)
  lib/                        Framework-agnostic utilities (cn())
  styles/                     tokens.css - design tokens, imported into app/globals.css
  types/                      Shared TypeScript types (NavSection, NavLink, ContentEntry)
public/
  images/               Static image assets (empty - hero currently hotlinks a
                        temporary Unsplash photo; see Known placeholders below).
  fonts/                Reserved for self-hosted font files if ever needed
                         (fonts currently load via next/font/google).
```

## Design tokens

Defined in [`src/styles/tokens.css`](src/styles/tokens.css) as CSS variables,
mapped into Tailwind utilities via `@theme inline` in
[`src/app/globals.css`](src/app/globals.css). Light tokens live on `:root`,
dark tokens on `[data-theme="dark"]` (matches `next-themes`'
`attribute="data-theme"` configuration in `app/layout.tsx`).

- **Color:** one primary hue (clinical teal-blue) + one CTA accent hue
  (clinical green), neutral surfaces/borders/text. Locked per the project's
  "one accent color" rule - do not introduce a second accent.
- **Typography:** `Figtree` (display/headings) + `Noto Sans` (body) + `JetBrains Mono`
  (stats/data), loaded via `next/font/google` in `app/layout.tsx`. Deliberately
  not Inter.
- **Radius:** locked soft-pill system - `sm` (inputs), `md` (cards), `lg`
  (panels), `full` (pills/primary CTAs).
- **Shadow:** tinted to the brand hue, never pure black.
- **Spacing:** `py-section` / `py-section-lg` utilities for section rhythm
  (spacious, trust-first density). The `Container` component applies
  `px-container` (gutter) and `max-w-[var(--container-max)]` (1280px content
  measure) - use it instead of hand-rolling `max-w-*`/`mx-auto` per section.
- **Breakpoints:** Tailwind defaults (`sm` 640 / `md` 768 / `lg` 1024 / `xl`
  1280 / `2xl` 1536), declared explicitly in `globals.css` for documentation.
- **Z-index:** documented scale (`z-sticky-nav`, `z-dropdown`, `z-overlay`,
  `z-modal`, `z-toast`) - never use arbitrary `z-*` values.

Dark mode is theme-ready (tokens exist) but not yet exposed via a visible
toggle; `enableSystem` is off until that UI ships.

## Known placeholders (replace before launch)

- **Hero photo** (`src/components/sections/hero.tsx`): hotlinked from
  `images.unsplash.com` (a real, on-topic radiology-workstation photo, under
  the Unsplash License) as a temporary asset. Swap `HERO_IMAGE_SRC` for a
  licensed/original photo and remove the `images.unsplash.com` entry in
  `next.config.ts` once replaced.
- **Logo**: `src/components/layout/navbar.tsx` renders a text wordmark ("WE"
  monogram + "Healthcare") - no logo asset exists yet.
- **Inner pages**: every nav route exists but renders `PagePlaceholder`.
  To build one, add its sections under `components/sections/<page>/` and
  replace the placeholder in `app/<route>/page.tsx`.

## Conventions

- Path alias `@/*` -> `src/*`.
- Links: use `routes.*` from `config/routes.ts`; menus read `config/navigation.ts`.
  Adding a service/modality/audience = one entry in `content/*.ts` (nav, footer
  and page update automatically).
- Files and folders are kebab-case; components are PascalCase named exports.
- `cn()` in `src/lib/utils.ts` for conditional/merged class names.
- New interactive/animated components are Client Components (`"use client"`)
  isolated as leaves; layouts and pages stay Server Components by default.
- Icons: `@phosphor-icons/react` only - no hand-rolled SVG icon paths, no
  mixing icon families.

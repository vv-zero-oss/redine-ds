# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## What this is

A Next.js 16 (App Router) application that *is* a design system: the
"Transitions/Refine" demo page rebuilt so every color, size, shadow, radius,
duration and easing is a named token and every control is a component class that
reads those tokens. Tailwind v4, CSS-first, no config file.

shadcn/ui is installed on top of it — 61 components — but **none of shadcn's own
colors, shadows, radii or fonts reach the page**. Its variable names are aliased
onto this repo's tokens in `src/shadcn.css`.

Three routes:

| Route | What it is |
|---|---|
| `/` | The **Cluster landing page** — a second brand surface built on the same primitives, tokenised in `src/cluster.css` |
| `/design-system` | Foundations, components, and the Refine panel shell |
| `/shadcn` | Every installed shadcn/ui component, rendered through the token bridge |

`/design-system` and `/shadcn` sit in the `app/(design-system)/` route group, which
is what gives them the site header. The landing page is deliberately outside it —
it is its own brand and brings its own chrome.

## Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (also runs tsc)
npm run start        # serve the production build
npm run lint         # eslint (flat config, eslint-config-next)
npm run typecheck    # tsc --noEmit
```

There is no test suite. `npm run build` is the gate: it typechecks every file
in the repo, vendored shadcn sources included.

## Architecture

Five CSS layers, imported in `app/globals.css` in this order — the order is
load-bearing:

| Layer | Lives in | Contains | Swaps at runtime |
|---|---|---|---|
| **Primitives** | `@theme` in `theme.css` | type scale, font weights, radii, control heights, durations, easings, motion distances | no |
| **Semantic** | `:root` / `html[data-theme="dark"]` in `theme.css` | `--ui-*` — every color and shadow recipe | **yes** |
| **Bridge** | `@theme inline` in `theme.css` | maps `--ui-*` → Tailwind utilities | emits `var()`, so yes |
| **shadcn alias** | `:root` + `@theme inline` in `shadcn.css` | maps `--background`, `--primary`, `--border`, … onto `--ui-*`, and Tailwind's shadow scale onto the house recipes | follows the tokens |
| **Cluster brand** | `:root` + `@theme inline` + `@layer components` in `cluster.css` | `--cl-*` — the landing page's ground, cream bands, glass recipes and `.cl-*` classes | dark-only, so no branch |

The reason for the split: Tailwind v4's `@theme` bakes values into generated
utilities at build time, so anything defined there can't change at runtime —
fine for a type scale, fatal for a theme. `@theme inline` is what lets
`bg-surface` etc. follow the `data-theme` attribute with **zero dark-mode
overrides anywhere in `components.css` or `shadcn.css`** — all dark handling
lives in the one token block in `theme.css`.

**Specificity gotcha when touching the dark-mode block:** it's written as
`html[data-theme="dark"], html[data-tl-theme="dark"]` (specificity 0,1,1) so it
outranks `:root` (0,1,0). Do not wrap it in `:where()` — that zeroes its
specificity and `:root` silently wins (attribute flips, nothing retints). The
`:where()` inside the `@custom-variant dark (...)` block is different and
correct — that one governs the `dark:` utility variant itself, not this token
block.

Dark mode is driven by two attribute hooks, either one activates it:
`data-theme` (page chrome) and `data-tl-theme` (an embedded panel + its
body-portaled menus/toasts), so a host page and an embedded panel can theme
together or independently. Prefer semantic tokens (`bg-surface`,
`text-fg-muted`, …) over the `dark:` variant — the variant is for genuine
one-offs only.

Theme resolution (`light | dark | system` from `localStorage["ds:theme"]`) runs
in an inline `<script>` in `<head>` — `themeInitScript` in `lib/theme.ts`,
injected by `app/layout.tsx` — before first paint, to avoid a flash. Those two
attributes are the **single source of truth**: React reads them through
`useSyncExternalStore` (`hooks/use-theme.ts`) rather than keeping a second copy
in state, and `applyTheme()` is the only writer. This repo does **not** use
next-themes; `components/ui/sonner.tsx` was rewritten to read `data-theme`
instead.

### File map

- `src/theme.css` — all tokens (primitives, semantic, bridge) + dark mode.
- `src/shadcn.css` — shadcn's variable names aliased onto `--ui-*`, plus the
  house conventions applied by `data-slot`. No literal color belongs here.
- `src/components.css` — every house component class (buttons, inputs, menus,
  tabs, chips, overlays, motion recipes). No dark-mode rules belong here.
- `src/cluster.css` — the landing page's `--cl-*` tokens and `.cl-*` classes.
  It reuses the primitive layer (radii, durations, easings, motion distances)
  and adds only what a warm dark marketing page needs.
- `app/globals.css` — build entry; pins `@source` scan targets.
- `app/layout.tsx` — fonts and the no-flash theme script, nothing else.
- `app/page.tsx` — the Cluster landing page.
- `app/(design-system)/layout.tsx` — the site header and toast host, for that
  group only. `app/(design-system)/design-system/page.tsx` and
  `.../shadcn/page.tsx` are the two design-system routes.
- `app/fonts.ts` + `app/fonts/` — self-hosted Inter and Roboto Mono.
- `components/site/` — the page: header, theme toggle, sections, and the motion
  primitives (`dropdown`, `modal-demo`, `pill-tabs`, `segmented`, `scrubber`,
  `toggle-switch`, `toast-host`).
- `components/ui/` — vendored shadcn/ui.
- `components/shadcn-gallery/` — the `/shadcn` demo grid.
- `components/cluster/` — the landing page: nav, hero and its agent graph, the
  bento, the GTM section, testimonials, FAQ, footer, and its icon set.
- `hooks/` — `use-disclosure` (open/closing state), `use-theme`, `use-reveal`
  (the landing page's scroll entrance), `use-mobile`.
- `lib/` — `theme`, `motion` (reads duration tokens), `tokens` and `timeline`
  (page data), `utils` (`cn`).

## Rules for this repo

**Everything is a token.** Colors, fonts, shadows, borders, radii, control
heights, durations, easings, motion distances and pre-scales are all named
values in `src/theme.css`. Do not write a hex, an `rgb()`, a `px` size for a
control, or a `ms` duration inline in a component, in JSX, or in a `style`
attribute. If the value you need doesn't exist, add the token first.

- **Never invent a shadow, a font or a color.** Use the existing recipes. The
  system has exactly one font family for UI (Inter, self-hosted) and one for
  code (Roboto Mono).
- **Borders are inset shadows, never `border`** — so a control's box size never
  changes between rest, hover and focus.
- **Dark elevation is a light top edge, not a heavier drop shadow** — each
  shadow recipe redefines itself in the dark token block rather than just
  changing opacity.
- **Controls come in exactly three heights: 32 / 36 / 40**
  (`btn-sm/md/lg`, `input`/`input-lg`, …). `.btn-xs` is the 24px chip token, for
  icon buttons *inside* a field or chip row — not a fourth control height. Don't
  introduce one without discussion.
- **`color-mix()`** is used for hover tints and category chips (needs
  Chrome/Edge 111+, Safari 16.2+, Firefox 113+ — swap for literal rgba if older
  support is required).
- **Glass is a real `backdrop-filter`,** never a flat translucent fill, and it
  only goes over content worth blurring. The two recipes (`.cl-glass`,
  `.cl-glass-paper`) each compose a fill, a light top edge, a ring and a drop —
  a component sets one class, not four properties.
- **One font family.** Inter carries the display sizes too. It is a little wider
  than the grotesque the landing-page reference uses, so `.cl-display` and
  `.cl-h2` carry extra negative tracking to land on the same measure; that
  compensation is a token on the role, never a per-heading override.

## Motion

CSS owns every duration, curve and distance; JS only toggles a state class or
attribute (`is-open`, `is-closing`, `data-phase`, `data-state`, …). When JS has
to hold an exit class for the length of an animation it reads the token via
`durationMs()` in `lib/motion.ts` — it never repeats the number.

The house rules, which match the `animate` skill in `.agents/skills/`:

- **Opens are slower than closes,** and closes start from a nearer scale, by
  design (`--motion-scale-md` 0.97 open → `--motion-scale-xs` 0.99 close).
- **`transform` and `opacity` only** (plus `filter` for the panel cross-blur).
  Never animate `width`/`height`/`top`/`left`.
- **Never `ease-in` on UI**, never `scale(0)` as an entrance, never
  `transition: all` — name the properties.
- **Popovers scale from the trigger's own corner** (`transform-origin`);
  modals are exempt and stay centered.
- **UI motion stays under 300ms** unless it's a page-level moment.
- `prefers-reduced-motion` is handled once, in the base layer of `theme.css`.

Before adding motion, check the frequency gate: something a user triggers 100+
times a day should not animate at all.

## Working with shadcn/ui

Adding a component: drop the source into `components/ui/` and rewrite its
registry imports to `@/components/ui/*`, `@/lib/utils`, `@/hooks/*`. It will be
on-theme immediately — the alias layer in `src/shadcn.css` handles colors,
shadows, radii and fonts, and the `data-slot` rules in the same file handle the
four house conventions shadcn doesn't share (one focus ring; inset-shadow
borders; menu/modal surfaces; `scale: .96` press feedback).

**Restyle by `data-slot` in `src/shadcn.css`, not by editing 61 files.** That
keeps a future registry update a clean diff. The one deliberate exception is
`components/ui/button.tsx`, whose cva variants map onto the `.btn-*` skins so a
`<Button variant="secondary">` and a hand-written `.btn .btn-soft` are the same
control.

Vendored sources keep their upstream formatting on purpose, and the React
Compiler lint rules that fire on them are downgraded to warnings for
`components/ui/**` only (see `eslint.config.mjs`).

Not installed: `questionnaire` and the deprecated `toast` (use `sonner`) — they
are not in the public registry. `data-table`, `date-picker` and `typography` are
documentation compositions built from primitives that are already here.

## Before you finish

Run `npm run build` and `npm run lint`. If you changed anything visual, look at
both themes — a change that only works in light mode is a bug, not a detail.

See the README's "Token reference", "Components", "Migration map" and
"shadcn/ui on these tokens" sections for the full class/token catalogue and the
original → new class-name mapping (useful when porting more of the original
Transitions page).

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A standalone Tailwind v4 design system (no framework, no package.json / npm
dependencies committed). It's the "Transitions/Refine" demo page rebuilt so
every color, size, shadow, radius, duration and easing is a named token and
every control is a component class that reads those tokens.

## Commands

There is no npm install / test / lint pipeline in this repo. The two things
you'll actually run:

```bash
# Regenerate preview.html after editing index.html or src/*.css
node build-preview.mjs

# Production build (requires tailwindcss installed; not pre-installed here)
npx @tailwindcss/cli -i src/app.css -o dist/app.css --minify --watch
```

- `preview.html` is **generated** — never edit it directly, edit `index.html`
  and/or `src/*.css` and re-run `node build-preview.mjs`.
- `dist/app.css` is not checked in (only `dist/.gitkeep`) — it's a build
  artifact of the Tailwind CLI command above.
- To sanity-check changes with zero build step, just open `preview.html` in a
  browser — it compiles Tailwind in-page via `@tailwindcss/browser@4`.

## Architecture

Three CSS layers, imported in `src/app.css` (`tailwindcss` → `theme.css` →
`components.css`):

| Layer | Lives in | Contains | Swaps at runtime |
|---|---|---|---|
| **Primitives** | `@theme` in `theme.css` | type scale, radii, control heights, durations, easings, motion distances | no |
| **Semantic** | `:root` / `[data-theme="dark"]` in `theme.css` | `--ui-*` — every color and shadow recipe | **yes** |
| **Bridge** | `@theme inline` in `theme.css` | maps `--ui-*` → Tailwind utilities | emits `var()`, so yes |

The reason for the split: Tailwind v4's `@theme` bakes values into generated
utilities at build time, so anything defined there can't change at runtime —
fine for a type scale, fatal for a theme. `@theme inline` is what lets
`bg-surface` etc. follow the `data-theme` attribute with **zero dark-mode
overrides anywhere in `components.css`** — all dark handling lives in the one
token block in `theme.css`.

**Specificity gotcha when touching the dark-mode block:** it's written as
`html[data-theme="dark"], html[data-tl-theme="dark"]` (specificity 0,1,1) so
it outranks `:root` (0,1,0). Do not wrap it in `:where()` — that zeroes its
specificity and `:root` silently wins (attribute flips, nothing retints). The
`:where()` inside the `@custom-variant dark (...)` block is different and
correct — that one governs the `dark:` utility variant itself, not this token
block.

Dark mode is driven by two attribute hooks, either one activates it:
`data-theme` (page chrome) and `data-tl-theme` (an embedded panel + its
body-portaled menus/toasts), so a host page and an embedded panel can theme
together or independently. Prefer using semantic tokens (`bg-surface`,
`text-fg-muted`, etc.) over the `dark:` variant — the variant is for genuine
one-offs only.

Theme resolution (`light | dark | system` from `localStorage["ds:theme"]`)
runs in an inline `<script>` in `<head>` of `index.html`, before first paint,
to avoid a flash.

### File map

- `src/theme.css` — all tokens (primitives, semantic, bridge) + dark mode.
- `src/components.css` — every component class (buttons, inputs, menus, tabs,
  chips, overlays, motion recipes). No dark-mode rules belong here.
- `src/app.css` — build entry; also pins `@source` scan targets for a
  non-JS-framework repo.
- `index.html` — the real page, links `dist/app.css`, source of truth for
  markup/structure.
- `preview.html` — generated mirror of `index.html` with Tailwind inlined for
  no-build viewing.

### Component conventions worth knowing before editing CSS

- Borders are implemented as **inset shadows**, never `border` — so a
  control's box size never changes between rest/hover/focus.
- Dark elevation is a light top edge, not a heavier drop shadow — each shadow
  recipe redefines itself in the dark token block rather than just changing
  opacity.
- Controls come in exactly three heights: 32 / 36 / 40 (`btn-sm/md/lg`,
  `input`/`input-lg`, etc.) — don't introduce a fourth without discussion.
- Motion: CSS owns every duration/curve/distance; JS only toggles a state
  class or attribute (`is-open`, `data-phase`, `data-state`, …). Opens are
  slower than closes, and closes start from a nearer scale, by design.
- `color-mix()` is used for hover tints and category chips (needs Chrome/Edge
  111+, Safari 16.2+, Firefox 113+ — swap for literal rgba if older support
  is required).

See the README's "Token reference", "Components" and "Migration map" sections
for the full class/token catalogue and the original → new class-name mapping
(useful when porting more of the original Transitions page).

# Refine Design System — Next.js + Tailwind v4

The Transitions/Refine page rebuilt as a real design system on Next.js: every
color, size, shadow, radius, duration and easing is a named token, every control
is a component class that reads those tokens, and dark mode is one attribute
flip. shadcn/ui is installed on top — aliased onto the same tokens, so none of
its own colors, shadows, radii or fonts reach the page.

```
redine-ds/
├── app/
│   ├── layout.tsx          ← fonts, no-flash theme script, header, toast host
│   ├── globals.css         ← build entry (imports the four layers below)
│   ├── fonts.ts            ← self-hosted Inter + Roboto Mono (next/font/local)
│   ├── fonts/              ← the two variable .woff2 files
│   ├── page.tsx            ← the design-system page
│   └── shadcn/page.tsx     ← every shadcn component on these tokens
├── src/
│   ├── theme.css           ← tokens: type, color, radius, shadow, motion + dark mode
│   ├── shadcn.css          ← shadcn variable names aliased onto --ui-* tokens
│   └── components.css      ← buttons, inputs, selects, menus, tabs, chips, overlays…
├── components/
│   ├── ui/                 ← shadcn/ui (vendored, 61 components)
│   ├── site/               ← the page itself: header, sections, motion primitives
│   └── shadcn-gallery/     ← the /shadcn demo grid
├── hooks/                  ← use-disclosure, use-theme, use-mobile
└── lib/                    ← theme, motion, tokens, timeline, cn
```

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint         # next lint
npm run typecheck    # tsc --noEmit
```

Two routes:

| Route | What it is |
|---|---|
| `/` | The design system: foundations, components, and the Refine panel shell |
| `/shadcn` | Every installed shadcn/ui component, rendered through the token bridge |

---

## Architecture — why four layers

Tailwind v4's `@theme` bakes values into the generated utilities at build time,
so anything defined there **cannot change at runtime**. That's fine for a type
scale; it's fatal for a theme.

So the system splits:

| Layer | Lives in | Contains | Swaps at runtime |
|---|---|---|---|
| **Primitives** | `@theme` | type scale, radii, control heights, durations, easings, motion distances | no |
| **Semantic** | `:root` / `[data-theme="dark"]` | `--ui-*` — every color and shadow recipe | **yes** |
| **Bridge** | `@theme inline` | maps `--ui-*` → Tailwind utilities | emits `var()`, so yes |
| **shadcn alias** | `:root` + `@theme inline` in `shadcn.css` | maps shadcn's variable names onto `--ui-*` | follows the tokens |

`@theme inline` is the key: it emits `var(--ui-surface)` into the utility
instead of copying the literal. So `bg-surface` follows the theme attribute with
no duplicated dark rules anywhere in the component layer.

The result: **`components.css` contains zero dark-mode overrides.** The original
page needed ~180 lines of `html[data-tl-theme="dark"] .tl-*` rules; this needs none.

## Dark mode

Two attribute hooks, either one activates the theme:

- `data-theme` — page chrome
- `data-tl-theme` — the embedded panel and its body-portaled menus/toasts

so a host page and an embedded panel can theme together or independently.

```css
@custom-variant dark (&:where(
  [data-theme="dark"], [data-theme="dark"] *,
  [data-tl-theme="dark"], [data-tl-theme="dark"] *
));
```

You rarely need `dark:` — semantic tokens handle it. Reach for the variant only
for genuine one-offs.

> **Specificity gotcha, if you extend the theme:** the dark token block is
> written as `html[data-theme="dark"], html[data-tl-theme="dark"]` (0,1,1) so it
> outranks `:root` (0,1,0). Wrapping it in `:where()` zeroes its specificity and
> `:root` silently wins — the attribute flips and nothing retints. Keep the bare
> selectors. (The `:where()` in `@custom-variant` is fine and intentional — that
> one applies to the utility itself, where Tailwind's layer order decides.)

The inline `<script>` in `<head>` resolves `light | dark | system` from
`localStorage["ds:theme"]` before first paint, so there's no flash. The toggle
cycles light → dark → system.

---

## Token reference

### Type — nine px-locked steps

| Utility | Size / line-height | Role |
|---|---|---|
| `text-3xl` | 36 / 34 | hero |
| `text-2xl` | 26 / 32 | page + section title |
| `text-xl` | 18 / 24 | eyebrow |
| `text-lg` | 16 / 24 | lead paragraph |
| `text-md` | 15 / 21 | card + section heading |
| `text-base` | 14 / 20 | long-form body |
| **`text-sm`** | **13 / 18** | **UI default** — buttons, rows, inputs, menu items |
| `text-xs` | 12 / 16 | captions, helper text |
| `text-2xs` | 11 / 14 | meta, section headers, keycaps |

Named roles wrap these so "what is a label" is decided once:
`type-display` `type-title` `type-heading` `type-eyebrow` `type-lead`
`type-body` `type-body-lg` `type-label` `type-field-label` `type-caption`
`type-meta` `type-mono` `type-code`.

### Color — semantic roles, not hues

Every one exists as `bg-*`, `text-*` and `border-*`.

**Surfaces** `bg` · `bg-alt` · `surface` · `surface-raised` · `surface-sunken` · `overlay`
**Text** `fg` · `fg-strong` · `fg-muted` · `fg-subtle` · `fg-faint` · `fg-disabled` · `fg-onaccent`
**Lines** `line` · `line-soft` · `line-strong`
**Fills** `fill` / `fill-hover` / `fill-active` · `ghost-hover` · `raised` / `raised-hover` · `input` · `input-flat` · `track` · `thumb` · `item-hover` / `item-active`
**Accent** `accent` · `accent-strong` · `accent-bg` (+ `-hover` / `-active` as `--ui-*`)
**Status** `success` · `danger` · `warn`
**Categories** `--ui-cat-easing` · `-duration` · `-scale` · `-blur` · `-delay`

### Elevation

`shadow-ring` · `shadow-drop` · `shadow-btn` · `shadow-input` · `shadow-hairline`
· `shadow-card` · `shadow-menu` · `shadow-panel` · `shadow-modal`

Two rules carried over from the original, and worth keeping:

1. **Borders are inset shadows**, never `border`. A control's box never changes
   size between rest, hover and focus.
2. **Dark elevation is a light top edge**, not a heavier drop shadow — every
   recipe redefines itself in the dark block.

### Motion

| Duration | | Easing | |
|---|---|---|---|
| `duration-micro` | 120ms — hover/press | `ease-smooth` | `cubic-bezier(.22, 1, .36, 1)` — the house curve |
| `duration-fast` | 150ms — closes | `ease-morph` | `cubic-bezier(.34, 1.25, .64, 1)` — size morphs |
| `duration-medium` | 250ms — opens | `ease-bounce` | `cubic-bezier(.34, 1.36, .64, 1)` — badge pop |
| `duration-slow` | 400ms — panels | `ease-bounce-strong` | `cubic-bezier(.34, 3.85, .64, 1)` |
| `duration-very-slow` | 600ms — page moments | | |

Plus pre-scales (`--motion-scale-lg/md/sm/xs` = .96/.97/.98/.99), travel
distances and blur steps. These are the transitions.dev tokens, so the demo page
is now self-consistent — the old dropdown ran `scale(0.8)` over `300ms ease`,
which is precisely what Refine flags as off-grid.

### Radii & control heights

`rounded-xs` 5 · `sm` 6 · `md` 8 (default control) · `lg` 10 · `xl` 12 (menus,
cards, panels) · `2xl` 14 · `3xl` 20 · `pill` 999

Controls come in **three heights only**: 32 / 36 / 40.

---

## Components

### Buttons

```html
<button class="btn btn-raised">Reset</button>
<button class="btn btn-lg btn-accent btn-pill">Refine</button>
<button class="btn btn-icon btn-ghost" aria-label="Minimize">…</button>
```

`.btn` sets shape and rhythm; a variant sets skin; a size sets height.

| Variant | Use |
|---|---|
| `btn-raised` | white/elevated — the default affirmative action |
| `btn-solid` | high-contrast fill — at most one per view |
| `btn-soft` | tinted flat fill — secondary |
| `btn-ghost` | transparent until hovered — toolbar actions |
| `btn-accent` | layered blue — the branded "smart" action |
| `btn-danger` | destructive |

Sizes `btn-sm` (32) · `btn-md` (36, default) · `btn-lg` (40).
Shapes `btn-pill` · `btn-icon` (square, combines with any size).

Press feedback is `scale: .96`, not `transform`, so it composes with any
transform a parent animation is already running.

`btn-accent` is three stacked layers — a `::before` tint, an `::after` inset
ring and a drop shadow — because one `background` can't hold a P3 tint, a ring
and a drop at the same time, and each needs to animate independently.

### Inputs

`input` (+ `input-lg` `input-flat` `input-mono`) · `input-search` · `input-num`
· `textarea` · `switch` · `field` / `field-hint` / `field-error`

**Scrubber** — the signature control: a slider and a number input sharing one
box. `scrubber` › `scrubber-fill` `scrubber-track` `scrubber-label`
`scrubber-value` `scrubber-thumb`, with `scrubber-stepper` alongside.
States: `.is-editing`, `.is-dragging`.

Focus is an inset ring on the well, never an outer glow, so a focused field
stays inside its row.

### Select & menu

`select` › `select-value` `select-icon` — the chevron rotates off the same
`aria-expanded` the menu reads.

`menu` › `menu-item` (`menu-item-text` `menu-item-hint` `menu-item-icon`
`menu-item-check`, `.is-disabled`) · `menu-section` · `menu-divider`
(full-bleed) · `menu-search` · `menu-empty` · `menu-footer`

### Tabs, chips, keycaps

`tabs` + `tab` + `tabs-pill` (sliding pill — one element tweens `translate` and
`width`, so only two properties animate however many tabs there are) ·
`seg` + `seg-btn` · `nav-pill`

`badge` · `badge-count` (`.is-single` → perfect circle) · `badge-soft` ·
`chip` + `chip-easing|duration|scale|blur|delay` · `chip-status` (`.is-off`) +
`status-dot` · `kbd`

### Overlays

`tooltip` inside `tooltip-host` — CSS-only, no JS. Modifiers `tooltip-below`
`tooltip-end` `tooltip-wrap` `tooltip-kbd`.
`toast` (`.is-closing`) · `card` · `card-flat` · `panel` · `divider` / `divider-soft`

### Motion recipes

JS toggles a class; CSS owns every duration, curve and distance.

| Class | States | Behaviour |
|---|---|---|
| `m-dropdown` | `is-open` / `is-closing` | scales from the anchor corner, `data-origin` picks which |
| `m-modal` + `m-scrim` | `is-open` / `is-closing` | 250ms open, 150ms close |
| `m-panel` | `data-open` + `data-phase` | travels further on open than close, with cross-blur |
| `m-icon-swap` | `data-state="a\|b"` | two icons cross-blur in one grid cell |

All of them open slower than they close, and close from a nearer scale — so
dismissal reads as instant while arrival reads as deliberate.

---

## Migration map

| Original | Now |
|---|---|
| `--c-text` `--c-text-mut` `--c-text-faint` | `--ui-fg` `--ui-fg-muted` `--ui-fg-faint` |
| `--c-blue` `--c-blue-bg` | `--ui-accent` `--ui-accent-bg` |
| `--c-line` `--c-hairline` | `--ui-line` `--ui-line-strong` |
| `--shadow-btn` `--menu-shadow` `--card-shadow` | `shadow-btn` `shadow-menu` `shadow-card` |
| `--panel-ease` / `--dropdown-ease` | `--ease-smooth` (one curve, one name) |
| `.tl-accept-btn` `.tl-sec-btn` | `.btn .btn-raised` |
| `.tl-ghost-btn` | `.btn .btn-ghost` |
| `.tl-icon-btn` | `.btn .btn-icon .btn-soft` |
| `.tl-refine-btn` `.tl-scan-morph` | `.btn .btn-accent` |
| `.tl-pill-btn` | `.btn .btn-raised .btn-pill` |
| `.tl-select` | `.select` |
| `.tl-field` + `.tl-field-*` | `.scrubber` + `.scrubber-*` |
| `.tl-cubic-cell` | `.input-num` |
| `.tl-menu` `.tl-menu-item` `.tl-menu-section` | `.menu` `.menu-item` `.menu-section` |
| `.tl-seg` `.tl-seg-btn` | `.seg` `.seg-btn` |
| `.proto-tabs` `.proto-tab` | `.tabs` `.tab` |
| `.tl-prop-member` `.tl-insp-member` `.tl-sug-member` | `.badge` (one class, three call sites) |
| `.tl-pill-count` | `.badge-count` |
| `.tl-sug-cat.is-easing` … | `.chip.chip-easing` … |
| `.tl-kbd` | `.kbd` |
| `.t-tt` `.t-tt-wrap` | `.tooltip` `.tooltip-host` |
| `.tl-toast` | `.toast` |
| `.t-dropdown` | `.m-dropdown` |
| `.t-panel-slide` | `.m-panel` |
| `.t-icon-swap` | `.m-icon-swap` |
| `.tl-prop-row` `.tl-bar` | `.timeline-row` `.timeline-bar` |

Consolidations worth knowing about:

- The member chip existed three times (`tl-prop-member`, `tl-insp-member`,
  `tl-sug-member`) with identical rules plus a dark override each. Now one `.badge`.
- Six near-identical button shadow recipes collapsed to `shadow-btn` +
  `shadow-btn-inset`.
- `--dropdown-ease`, `--panel-ease`, `--morph-close-ease` and `--page-slide-ease`
  were all the same cubic-bezier under four names → `--ease-smooth`.

## shadcn/ui on these tokens

`npx shadcn@latest add <name>` drops a component into `components/ui/` written
against shadcn's own variable names — `--background`, `--primary`, `--border`,
`--ring` — and against Tailwind's default shadow scale. `src/shadcn.css` is the
only place those names exist in this repo, and every one of them is an alias:

```css
:root {
  --background: var(--ui-bg);
  --popover:    var(--ui-surface-raised);
  --primary:    var(--ui-fg);
  --border:     var(--ui-line);
  --ring:       var(--ui-accent);
  /* …and the rest */
}
```

The same file rewrites Tailwind's `--shadow-xs … --shadow-2xl` onto the house
shadow recipes, so a shadcn `shadow-lg` renders `--ui-shadow-menu` — including
the dark-mode light-top-edge treatment. Nothing in it needs a dark branch: the
`--ui-*` tokens already swap on `[data-theme="dark"]`, and an alias declared on
`:root` recomputes with them.

Four house rules shadcn does not share are applied by `data-slot`, so they hold
for every component — including one added later — without editing 61 files:

1. **One focus ring.** shadcn draws a 3px outer glow and suppresses the outline;
   both are replaced by the single house ring. Text wells focus inward instead.
2. **Borders are inset shadows, never `border`,** so a control's box never
   changes size between rest, hover and focus.
3. **Menus, popovers and dialogs** are the `.menu` and modal surfaces, not
   shadcn's bordered card.
4. **Press feedback is `scale: .96`.**

One component is rewritten at source rather than restyled: `Button` maps each
shadcn variant onto a `.btn-*` skin, so `<Button variant="secondary">` and a
hand-written `.btn .btn-soft` are the same control.

Not installed, because they are not in the public registry at the path the rest
were fetched from: `questionnaire` and the deprecated `toast` (use `sonner`).
`combobox`, `data-table`, `date-picker` and `typography` are documentation
compositions — `combobox` is vendored, the other three are built from the
primitives that are already here.

## Known gaps

- The Refine panel shell is a faithful reconstruction, not a live editor — the
  timeline bars and the inspector are wired for selection and scrubbing, not for
  writing back to source.
- `questionnaire` and `toast` are absent (see above).
- The four React Compiler lint warnings that remain are all in vendored shadcn
  sources, kept as upstream wrote them so a registry update stays a clean diff.
- `color-mix()` is used for hover tints and category chips — Chrome/Edge 111+,
  Safari 16.2+, Firefox 113+. Swap for literal rgba if you need older support.

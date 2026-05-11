---
name: design-system-setup
description: >
  Extract, normalize, and implement a complete design system for a Turborepo
  monorepo containing a Vite + ReactJS web app and a bare React Native CLI app.
  Use this skill when setting up design tokens from Figma, establishing the
  tokens.ts and rn-styles.ts dual-output pipeline, wiring Tailwind on web,
  configuring StyleSheet constants for native, or auditing token drift. This
  skill is monorepo-aware: tokens always land in /packages/core and are consumed
  by both /apps/web and /apps/native. Never treat tailwind.config.ts as the
  token source of truth — tokens.ts is always the master.
---

# Design System Setup Skill

This skill establishes a production-grade, monorepo-aware design system foundation
for a project using Vite + ReactJS (web) and bare React Native CLI (native), managed
in a Turborepo + pnpm workspace.

Its purpose is not just token extraction — it is to produce a single source of truth
in `/packages/core` that feeds two completely different styling systems (Tailwind CSS
on web, StyleSheet on native) without duplication, drift, or platform bleed.

---

## Architecture Overview (Read First)

```
Figma (source of truth)
        │
        ▼  [Figma MCP extraction]
/packages/core/src/tokens/
        ├── index.ts          ← Master token file. Web + native both import from here.
        └── rn-styles.ts      ← StyleSheet-ready constants derived from index.ts.
                                 Numeric values only. No CSS shorthand. No % widths.
        │
        ├── consumed by /apps/web/tailwind.config.ts  (Tailwind extends tokens)
        └── consumed by /apps/native components       (StyleSheet.create via rn-styles.ts)
```

**Non-negotiable rules this skill enforces:**

- `tokens/index.ts` is always the single source of truth
- `tailwind.config.ts` imports from tokens — it never defines tokens
- `rn-styles.ts` is always a derived artifact from `index.ts` — never edited manually
- No platform-specific code ever enters `/packages/core`
- Every extraction produces BOTH `index.ts` and `rn-styles.ts` as paired outputs

---

## Core Principles

1. **Tokens.ts is master, everything else is a consumer**
   Tailwind config, StyleSheet constants, and any documentation are all derived
   from `tokens/index.ts`. Never let a consumer become the source.

2. **Always produce dual output**
   Every token extraction session must output both `index.ts` (web-ready) and
   `rn-styles.ts` (native-ready). Producing only one is an incomplete execution.

3. **Platform-aware splitting at extraction time**
   Some token categories (shadows, fonts) require platform-specific representations.
   Split these during extraction — not during component development.

4. **Adapt to Figma organization quality**
   Figma files vary in quality. Normalize messy designer naming into stable
   engineering naming. Never promote accidental mockup values into global tokens.

5. **Separate certainty from inference**
   Clearly distinguish confirmed tokens, inferred tokens, assumed fallbacks,
   and missing data. Never silently invent values.

6. **One coherent system, two rendering targets**
   The goal is a single token architecture that feels native to both web and
   React Native — not two separate systems bolted together.

---

## When This Skill Should Be Used

Use this skill when:

- Setting up the design system from scratch
- Extracting tokens from Figma via MCP
- Auditing token drift (hardcoded values in components)
- Adding a new token category (e.g. motion, elevation)
- Syncing after Figma design updates
- Debugging Metro or Tailwind failing to resolve token values
- Onboarding a new developer who needs to understand the token system

Do **not** use this skill for:

- Generating individual components (use `web-component.md` or `rn-component.md`)
- API hook generation (use `api-hook.md`)
- Web-to-native migration (use `web-to-native.md`)

---

## Supported Input Types

| Input                                                | How to Handle                                                                                 |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Figma MCP (connected)                                | Highest fidelity. Extract variables, styles, modes, effects, text styles. Always prefer this. |
| Figma URL                                            | Use MCP to fetch node metadata. If MCP unavailable, request export or screenshot.             |
| tokens.json / Style Dictionary / Token Studio export | Parse directly, normalize naming, then produce dual output.                                   |
| Existing `tokens/index.ts`                           | Audit against Figma. Update drift. Regenerate `rn-styles.ts`.                                 |
| Screenshot / image                                   | Extract visually. Mark all values as Inferred. Never treat as confirmed.                      |
| Verbal description                                   | Use for planning only. Never finalize a token system from prose alone.                        |

---

## Phase 1 — Monorepo & Project Audit

Before generating anything, inspect the current state of the repo.

### 1.1 Verify monorepo structure

Confirm the following exist (create stubs if missing):

```
/packages/core/src/tokens/index.ts
/packages/core/src/tokens/rn-styles.ts
/apps/web/tailwind.config.ts
/apps/web/vite.config.ts
/apps/native/metro.config.js
```

### 1.2 Check Tailwind relationship

Open `/apps/web/tailwind.config.ts`. Determine if it:

- ✅ Imports from `@repo/core/tokens` (correct)
- ❌ Defines token values inline (incorrect — tokens belong in `/packages/core`)

If incorrect, flag for remediation in Phase 6.

### 1.3 Check Metro config

Open `/apps/native/metro.config.js`. Confirm `watchFolders` includes the monorepo root.
If missing, flag — native will fail to resolve `@repo/core` imports.

```js
// Required in metro.config.js
watchFolders: [path.resolve(__dirname, '../..')],
resolver: {
  nodeModulesPaths: [
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, '../../node_modules'),
  ],
}
```

### 1.4 Audit existing tokens for drift

Scan `/packages/ui-web` and `/packages/ui-native` for:

- Raw hex values (`#xxxxxx`)
- Raw pixel values (`px-[16px]`, `paddingHorizontal: 16`)
- Hardcoded font sizes, weights, or families
- Tailwind arbitrary values (`bg-[#3B82F6]`)
- Inline styles on web components (`style={{ color: 'red' }}`)

Document all drift instances. Report in Phase 8 output.

### 1.5 Audit output

Produce a summary:

- Monorepo structure: intact / missing files
- Tailwind relationship: correct / inverted
- Metro config: correct / missing watchFolders
- Token drift: count of violations found
- Recommended action: fresh extraction / update / audit-only

---

## Phase 2 — Figma Extraction via MCP

Connect to Figma via the MCP server. The Figma file ID is in `.claude/settings.json`.

### 2.1 What to extract

#### A. Foundation tokens (primitive values)

| Category       | What to pull                                                     |
| -------------- | ---------------------------------------------------------------- |
| Color palettes | All color variables: brand, neutral, semantic states             |
| Typography     | Font family, size scale, weight, line height, letter spacing     |
| Spacing        | All spacing variables — confirm 4px base grid                    |
| Border radius  | All radius values                                                |
| Shadows        | All shadow definitions — extract as raw values, split in Phase 4 |
| Opacity        | Any explicit opacity scale                                       |
| Motion         | Duration and easing if defined                                   |
| Breakpoints    | Any breakpoint/container tokens if defined                       |

#### B. Semantic tokens (purpose-mapped values)

| Role                             | Maps to                             |
| -------------------------------- | ----------------------------------- |
| Background / surface             | Neutral palette values              |
| Text / foreground                | Color values for readable text      |
| Border                           | Color values for dividers, outlines |
| Primary action                   | Brand primary palette               |
| Secondary action                 | Brand secondary palette             |
| Success / error / warning / info | Semantic state colors               |
| Disabled                         | Muted color + opacity               |
| Overlay / scrim                  | Semi-transparent black/white        |
| Focus / ring                     | Accessibility focus indicator       |

#### C. Component-level tokens (extract if explicitly defined in Figma)

Only promote to component tokens if the Figma file explicitly defines them.
Do not infer component tokens from visual inspection alone.

Examples if present:

- Button states: default, hover, active, disabled, loading
- Input states: default, focus, error, disabled
- Card surface hierarchy
- Badge variants
- Toast / alert states

### 2.2 Interaction states to identify

Where visible in Figma:

- default, hover, active, focus, disabled, selected, error, success, loading, pressed

### 2.3 Theme modes

If Figma defines multiple modes (light/dark/brand themes), extract each explicitly.
Do **not** fabricate a dark mode system if it is not in Figma.
If dark mode is absent, add a comment in `tokens/index.ts`:

```ts
// Dark mode tokens: pending design input from Figma
```

---

## Phase 3 — Normalization

Convert whatever Figma naming exists into stable engineering naming.

### 3.1 Naming rules

| Rule                            | Example                                                           |
| ------------------------------- | ----------------------------------------------------------------- |
| No designer-specific labels     | `blue2` → `colors.brand.primary[200]`                             |
| No ambiguous names              | `main` → `colors.brand.primary[500]`                              |
| Separate palette from semantic  | `#3B82F6` is a palette value; `colors.action.primary` is semantic |
| Scale values numerically        | `50, 100, 200 ... 900, 950` for color palettes                    |
| Scale spacing by 4px grid index | `spacing[1]` = 4px, `spacing[4]` = 16px, `spacing[8]` = 32px      |
| Use role names for semantic     | `text.primary`, `surface.canvas`, `border.default`                |

### 3.2 Three-layer token architecture

```
Layer 1 — Foundation (primitives)
  colors.palette.blue[500]
  spacing[4]
  radius.md
  shadow.md

Layer 2 — Semantic (purpose)
  colors.text.primary       → maps to colors.palette.neutral[900]
  colors.surface.canvas     → maps to colors.palette.neutral[50]
  colors.action.primary.bg  → maps to colors.palette.blue[500]

Layer 3 — Component (optional, only if Figma defines them)
  button.primary.bg.default → maps to colors.action.primary.bg
  input.border.focus        → maps to colors.palette.blue[300]
```

### 3.3 Confidence levels

Every token must be tagged:

| Level         | Meaning                                      |
| ------------- | -------------------------------------------- |
| **Confirmed** | Directly defined in Figma variables          |
| **Inferred**  | Strongly implied by visible pattern or scale |
| **Assumed**   | Added as system fallback for completeness    |
| **Missing**   | Required by system but absent in Figma       |

### 3.4 Handle messy Figma

If Figma has inconsistencies:

- Cluster near-identical values → identify canonical value
- Isolate one-off exceptions — do not promote to global tokens
- Document conflicts explicitly in the summary
- Never silently flatten conflicting values

---

## Phase 4 — Platform-Aware Token Splitting

This phase is unique to this monorepo. Before writing any file, split token
categories that behave differently across platforms.

### 4.1 Shadow splitting (mandatory)

Web and native represent shadows entirely differently.

```ts
// In tokens/index.ts — store the semantic intent
shadow: {
  sm: {
    web: '0 1px 2px 0 rgba(0,0,0,0.05)',
    native: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,        // Android
    }
  },
  md: {
    web: '0 4px 6px -1px rgba(0,0,0,0.1)',
    native: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    }
  },
  lg: {
    web: '0 10px 15px -3px rgba(0,0,0,0.1)',
    native: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 8,
    }
  }
}
```

`rn-styles.ts` consumes `.native` values only.
Tailwind config consumes `.web` values only.

### 4.2 Typography / font loading split

Web fonts are loaded via CSS `@font-face` or a font CDN in `/apps/web`.
Native fonts are linked via `react-native.config.js` and placed in `/apps/native/assets/fonts/`.

In `tokens/index.ts`, store the font family name as a string:

```ts
typography: {
  family: {
    sans: 'Inter',   // Web: maps to CSS font-family. Native: maps to fontFamily in StyleSheet.
    mono: 'JetBrains Mono',
  }
}
```

In `rn-styles.ts`, the font family value must exactly match the linked font filename
(React Native is case-sensitive with font names on iOS).

Document the required font files under `/apps/native/assets/fonts/` in the output.

### 4.3 Spacing and radius (no split needed)

Spacing and radius use plain numeric values — compatible with both web (Tailwind
uses numeric scales) and native (StyleSheet accepts numbers directly).

```ts
spacing: { 1: 4, 2: 8, 3: 12, 4: 16, 6: 24, 8: 32, 12: 48, 16: 64 }
radius: { sm: 4, md: 8, lg: 12, xl: 16, full: 9999 }
```

### 4.4 Percentage widths (native forbidden)

Never include `%` values in `rn-styles.ts`. If a layout token needs percentage
sizing for native, use a comment:

```ts
// Note: % widths are invalid in RN StyleSheet.
// Use Dimensions.get('window').width * 0.x or Flexbox instead.
```

### 4.5 CSS shorthand (native forbidden)

Never use CSS shorthand in `rn-styles.ts`:

```ts
// ❌ WRONG for native
padding: '16px 24px'
border: '1px solid #ccc'
font: 'bold 16px/1.5 Inter'

// ✅ CORRECT for native
paddingVertical: 16,
paddingHorizontal: 24,
borderWidth: 1,
borderColor: colors.border.default,
fontWeight: '700',
fontSize: 16,
lineHeight: 24,
fontFamily: 'Inter',
```

---

## Phase 5 — Token Summary (Before File Generation)

Before writing any file, produce this summary and confirm before proceeding.

```md
## Design System Extraction Summary

### Environment

- Web app: Vite + ReactJS + Tailwind CSS
- Native app: React Native CLI (bare, no Expo)
- Monorepo: Turborepo + pnpm
- Token source of truth: /packages/core/src/tokens/index.ts
- Tailwind relationship: extends from tokens (correct) / needs fixing
- Metro watchFolders: correct / needs fixing

### Foundation Tokens

#### Colors

| Token | Value | Confidence |
| ----- | ----- | ---------- |

#### Typography

| Role | Family | Size | Weight | Line Height | Letter Spacing | Confidence |
| ---- | ------ | ---- | ------ | ----------- | -------------- | ---------- |

#### Spacing

| Token | px Value | Confidence |
| ----- | -------- | ---------- |

#### Border Radius

| Token | Value | Confidence |
| ----- | ----- | ---------- |

#### Shadows

| Token | Web value | Native value | Confidence |
| ----- | --------- | ------------ | ---------- |

### Semantic Tokens

| Token | Maps to | Confidence |
| ----- | ------- | ---------- |

### Component Tokens (if present in Figma)

| Token | Value / Mapping | Confidence |
| ----- | --------------- | ---------- |

### Platform Split Required

- Shadows: yes/no
- Fonts: list font files needed in /apps/native/assets/fonts/
- Percentage values flagged: yes/no

### Missing / Ambiguous

- List tokens expected but not found in Figma
- List any conflicts in Figma naming

### Drift Found

- List all hardcoded values found during Phase 1 audit
```

If extraction confidence is high, proceed to Phase 6 automatically.
Pause only for major ambiguities that would materially break the system.

---

## Phase 6 — File Generation

Generate files in this exact order. Do not skip steps.

### Step 1 — `/packages/core/src/tokens/index.ts`

The master token file. Exports all foundation and semantic tokens.
Platform-split tokens (shadows) use the `{ web, native }` structure.

```ts
// Below is the reference code only. generate actual code by taking reference from FIGMA only.
// /packages/core/src/tokens/index.ts
// AUTO-GENERATED from Figma via Claude Code + Figma MCP
// Source of truth for all design tokens.
// DO NOT edit rn-styles.ts directly — regenerate it from this file.
// DO NOT hardcode values in components — always import from this file.

export const colors = {
  palette: {
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      /* ... */ 500: "#3b82f6",
      /* ... */ 900: "#1e3a8a",
    },
    neutral: { 50: "#f9fafb", /* ... */ 950: "#030712" },
    // ... other palettes
  },
  brand: {
    primary: "#3b82f6", // → colors.palette.blue[500]
    secondary: "#...",
  },
  semantic: {
    success: "#22c55e",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  },
  text: {
    primary: "#111827",
    secondary: "#6b7280",
    disabled: "#9ca3af",
    inverse: "#ffffff",
  },
  surface: {
    canvas: "#ffffff",
    subtle: "#f9fafb",
    overlay: "rgba(0, 0, 0, 0.5)",
  },
  border: {
    default: "#e5e7eb",
    strong: "#d1d5db",
    focus: "#3b82f6",
  },
  action: {
    primary: { bg: "#3b82f6", hover: "#2563eb", active: "#1d4ed8" },
    secondary: { bg: "#f3f4f6", hover: "#e5e7eb", active: "#d1d5db" },
  },
} as const;

export const typography = {
  family: {
    sans: "Inter",
    mono: "JetBrains Mono",
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },
  weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
  },
} as const;

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 24,
  full: 9999,
} as const;

export const shadow = {
  sm: {
    web: "0 1px 2px 0 rgba(0,0,0,0.05)",
    native: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
  },
  md: {
    web: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
    native: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
  },
  lg: {
    web: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
    native: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 8,
    },
  },
} as const;

// Dark mode: pending design input from Figma
```

---

### Step 2 — `/packages/core/src/tokens/rn-styles.ts`

Derived from `index.ts`. StyleSheet-safe values only.
No CSS shorthand. No `%` widths. No `.web` shadow values.

```ts
// Below is the reference code only. generate actual code by taking reference from FIGMA only.
// /packages/core/src/tokens/rn-styles.ts
// DERIVED from tokens/index.ts — do not edit manually.
// Regenerate this file by re-running the design-system-setup skill.
// All values are React Native StyleSheet-compatible:
//   - No CSS shorthand
//   - No % widths (use Dimensions API or Flexbox)
//   - Shadows use elevation + shadow* props, not box-shadow
//   - fontFamily values must match linked font filenames exactly

import { colors, typography, spacing, radius, shadow } from "./index";

export const rnTokens = {
  colors: {
    // Flatten for easy StyleSheet access
    primary: colors.brand.primary,
    secondary: colors.brand.secondary,
    textPrimary: colors.text.primary,
    textSecondary: colors.text.secondary,
    textDisabled: colors.text.disabled,
    textInverse: colors.text.inverse,
    surfaceCanvas: colors.surface.canvas,
    surfaceSubtle: colors.surface.subtle,
    borderDefault: colors.border.default,
    borderStrong: colors.border.strong,
    borderFocus: colors.border.focus,
    success: colors.semantic.success,
    error: colors.semantic.error,
    warning: colors.semantic.warning,
    info: colors.semantic.info,
    actionPrimaryBg: colors.action.primary.bg,
    white: "#ffffff",
    transparent: "transparent",
  },
  typography: {
    family: typography.family, // fontFamily — must match linked font filename
    size: typography.size, // numeric px values
    weight: typography.weight, // string values ('400', '700')
    lineHeight: {
      // numeric px values (RN does not use unitless ratios)
      tight: (size: number) => Math.round(size * 1.25),
      normal: (size: number) => Math.round(size * 1.5),
      relaxed: (size: number) => Math.round(size * 1.75),
    },
  },
  spacing, // plain numeric values — safe for padding, margin, gap
  radius, // plain numeric values — safe for borderRadius
  shadow: {
    // native shadow objects only — no CSS box-shadow strings
    sm: shadow.sm.native,
    md: shadow.md.native,
    lg: shadow.lg.native,
  },
} as const;

export type RnTokens = typeof rnTokens;
```

---

### Step 3 — `/apps/web/tailwind.config.ts`

Imports from `@repo/core/tokens`. Never defines token values inline.

```ts
// /apps/web/tailwind.config.ts
import type { Config } from "tailwindcss";
import { colors, typography, spacing, radius, shadow } from "@repo/core/tokens";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui-web/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.brand.primary,
        secondary: colors.brand.secondary,
        neutral: colors.palette.neutral,
        success: colors.semantic.success,
        error: colors.semantic.error,
        warning: colors.semantic.warning,
        info: colors.semantic.info,
        "text-primary": colors.text.primary,
        "text-secondary": colors.text.secondary,
        "text-disabled": colors.text.disabled,
        "surface-canvas": colors.surface.canvas,
        "surface-subtle": colors.surface.subtle,
        "border-default": colors.border.default,
        "border-focus": colors.border.focus,
      },
      fontFamily: {
        sans: [typography.family.sans, "sans-serif"],
        mono: [typography.family.mono, "monospace"],
      },
      fontSize: Object.fromEntries(
        Object.entries(typography.size).map(([k, v]) => [k, `${v}px`])
      ),
      fontWeight: typography.weight,
      spacing: Object.fromEntries(
        Object.entries(spacing).map(([k, v]) => [k, `${v}px`])
      ),
      borderRadius: Object.fromEntries(
        Object.entries(radius).map(([k, v]) => [
          k,
          v === 9999 ? "9999px" : `${v}px`,
        ])
      ),
      boxShadow: {
        sm: shadow.sm.web,
        md: shadow.md.web,
        lg: shadow.lg.web,
      },
    },
  },
  plugins: [],
};

export default config;
```

---

### Step 4 — `/apps/web/src/styles/fonts.css`

Global font loading for web. Native fonts are handled separately (see Step 5).

```css
/* /apps/web/src/styles/fonts.css */
/* Load fonts here. Update with actual font source URLs from your CDN or font service. */

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

/* If using self-hosted fonts instead:
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
*/
```

---

### Step 5 — Native font setup documentation

Native fonts must be linked manually. Document required steps:

```md
## Native font setup (required after token extraction)

1. Place font files in /apps/native/assets/fonts/
   Required files based on typography.family tokens:
   - Inter-Regular.ttf (weight 400)
   - Inter-Medium.ttf (weight 500)
   - Inter-SemiBold.ttf (weight 600)
   - Inter-Bold.ttf (weight 700)

2. Add to /apps/native/react-native.config.js:
   module.exports = {
   assets: ['./assets/fonts/'],
   }

3. Run font linking:
   npx react-native-asset

4. Rebuild the native app:
   npx react-native run-ios
   npx react-native run-android

Note: fontFamily in StyleSheet must match the PostScript name of the font,
not the filename. On iOS this is case-sensitive.
Verify with: console.log(Font.loadAsync) or check Font Book on macOS.
```

---

### Step 6 — `/packages/core/src/tokens/index.ts` export barrel

Ensure tokens are exported cleanly from the package root.

```ts
// /packages/core/src/index.ts — add if not present
export * from "./tokens/index";
export * from "./tokens/rn-styles";
```

---

## Phase 7 — Accessibility Check

Before finalising, verify:

- [ ] Primary text on canvas background meets WCAG AA contrast (4.5:1 minimum)
- [ ] Secondary text on canvas background meets WCAG AA large text (3:1 minimum)
- [ ] Error state is distinguishable without relying on color alone
- [ ] Focus/ring token is visible against all surface colors
- [ ] Disabled state is clearly distinct from default state
- [ ] Success and error states are not identical in luminance

Report any failures explicitly. Do not silently pass.

---

## Phase 8 — Output Checklist and Summary

After all files are generated, produce this summary:

```md
## Design System Setup — Output Summary

### Files Generated

- [ ] /packages/core/src/tokens/index.ts
- [ ] /packages/core/src/tokens/rn-styles.ts
- [ ] /apps/web/tailwind.config.ts (updated to import from tokens)
- [ ] /apps/web/src/styles/fonts.css
- [ ] Native font setup instructions

### Token Counts

- Foundation color tokens: N
- Semantic tokens: N
- Component tokens (if any): N
- Tokens with Confirmed confidence: N
- Tokens with Inferred confidence: N
- Tokens with Assumed confidence: N
- Tokens marked Missing: N

### Platform Split Applied

- Shadows: web (CSS box-shadow) + native (elevation + shadow\* props)
- Fonts: web (CSS @font-face) + native (react-native-asset linking required)
- % widths flagged and removed from rn-styles.ts: yes/no

### Drift Remediation

- Hardcoded values found in Phase 1: N
- Files affected: list them
- Action required: replace with token imports (manual or via next PR)

### Tailwind Relationship

- Status: correctly imports from @repo/core/tokens / fixed / still incorrect

### Metro Config

- Status: watchFolders correct / fixed / still missing

### Missing Tokens (requires Figma input)

- List any tokens marked Missing

### Accessibility Issues Found

- List any contrast or state visibility issues

### Next Steps

- [ ] Verify font PostScript names match fontFamily values in rn-styles.ts
- [ ] Run pnpm dev from root — confirm web resolves tokens
- [ ] Run npx react-native run-ios — confirm native resolves @repo/core/tokens
- [ ] QA: spot-check 3 components on web using Tailwind token classes
- [ ] QA: spot-check 3 components on native using rnTokens from rn-styles.ts
- [ ] Commit and open PR to develop branch
```

---

## Pitfalls to Avoid

- **Never define token values inside `tailwind.config.ts`** — it is a consumer, not a source
- **Never produce only web tokens** — always generate `rn-styles.ts` in the same session
- **Never use CSS shorthand in `rn-styles.ts`** — React Native StyleSheet rejects it
- **Never include `%` widths in `rn-styles.ts`** — use Dimensions API or Flexbox
- **Never use `.web` shadow values in native components** — use `.native` shadow objects
- **Never promote accidental Figma mockup values** into global tokens
- **Never fabricate dark mode tokens** if they are not in Figma — mark as pending
- **Never hardcode font names** — always pull from `typography.family` in tokens
- **Never remove `watchFolders` from `metro.config.js`** — Metro will silently break
- **Never use `any` type** in token files — use `as const` for full type inference
- **Never duplicate token definitions** across packages — one source, two consumers

---

## Skill Outcome

A successful execution of this skill produces:

- A single token source of truth in `/packages/core/src/tokens/index.ts`
- A StyleSheet-safe derived file in `/packages/core/src/tokens/rn-styles.ts`
- A Tailwind config that imports tokens rather than defining them
- Web font loading via CSS
- Native font linking instructions
- Zero hardcoded values in the component packages
- A documented list of any missing or ambiguous tokens requiring designer input
- A foundation that makes future component work on both platforms fast,
  consistent, and drift-free

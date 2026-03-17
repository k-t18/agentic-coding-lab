---
name: design-system-setup
description: >
  Establish, audit, normalize, or implement a reusable design system for a
  Next.js + Tailwind codebase using one or more design sources such as Figma
  screenshots, Figma links, structured token exports, or existing code files.
  Use this skill when the user wants to set up design tokens, sync design to
  code, standardize colors, typography, spacing, create a theme foundation,
  reconcile drift between design and implementation, or make future frontend
  development consistent and scalable. This skill is generic and must adapt to
  different project structures, Tailwind versions, router modes, designer naming
  styles, and varying quality of Figma organization.
---

# Design System Setup Skill

This skill creates a production-grade design system foundation that is safe, generic,
and adaptable across different Next.js + Tailwind projects.

Its purpose is not only to extract colors and typography, but to establish a
reliable token architecture so future frontend work becomes fast, consistent,
maintainable, and scalable.

---

## Core Principles

1. **Adapt before generating**
   - Never assume a fixed project structure.
   - Detect the actual repo shape and existing styling approach first.

2. **Prefer source-of-truth inputs**
   - Structured design data is better than screenshots.
   - Existing codebase conventions must be respected unless the user asks to refactor them.

3. **Be generic, not opinionated**
   - Different designers organize Figma differently.
   - Different projects use different token strategies.
   - Normalize inconsistencies instead of forcing one rigid pattern prematurely.

4. **Separate certainty from inference**
   - Clearly distinguish confirmed tokens, inferred tokens, assumed fallbacks, and missing data.

5. **Create one coherent system**
   - The goal is not just token extraction.
   - The goal is a consistent, semantic, reusable frontend foundation.

---

## When This Skill Should Be Used

Use this skill when the user wants to:

- Set up a design system from scratch
- Extract design tokens from Figma, screenshots, or JSON
- Sync design to code
- Standardize colors, typography, spacing, shadows, radii, breakpoints, or motion
- Create semantic tokens for scalable frontend work
- Audit or improve an existing design-token setup
- Reconcile design drift between Figma and the frontend repo
- Establish consistent theming for future component development
- Introduce dark mode token structure
- Create token documentation and usage rules

Do **not** use this skill for one-off component generation unless the user explicitly wants
system-level setup or token normalization.

---

## Supported Input Types

| Input Type                                               | How to Handle                                                                                                                           |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Structured design connector / MCP / design API**       | Treat as highest-fidelity source. Extract variables, styles, modes, text styles, effects, spacing, and component metadata if available. |
| **Figma screenshot / exported image**                    | Visually extract tokens, but mark uncertain values as inferred. Use image only when structured access is unavailable.                   |
| **Figma URL**                                            | Attempt to inspect metadata or connected design source. If no structured access is possible, request or use screenshots or exports.     |
| **tokens.json / Style Dictionary / Token Studio export** | Parse directly, then normalize naming and structure. Cross-check against design source if available.                                    |
| **Existing project files**                               | Audit current implementation before generating anything. Existing code may already contain valid design decisions.                      |
| **Verbal design description**                            | Use only for planning. Do not finalize a design system from prose alone unless the user explicitly wants a proposed starter system.     |

---

## Phase 1 — Project Detection and Audit

Before generating files, inspect the existing project and determine:

### 1.1 Framework and Router Shape

- Is this a Next.js project?
- Is it using **App Router** or **Pages Router**?
- Where is the global stylesheet loaded from?
- Where are fonts configured?

### 1.2 Tailwind Version and Styling Strategy

- Is the project using **Tailwind v3** or **Tailwind v4**?
- Is token customization done in:
  - `tailwind.config.*`
  - CSS variables
  - `@theme`
  - custom SCSS or CSS files
  - multiple places
- Is there already a token layer in code?

### 1.3 Existing System Files

Check whether the repo already contains any of the following or equivalents:

- global stylesheet
- Tailwind config
- PostCSS config
- token JSON files
- theme files
- TypeScript token exports
- font setup
- design-system docs
- utility classes
- component base styles

### 1.4 Existing Token Drift

Audit whether the codebase currently suffers from:

- raw hex values scattered across components
- inconsistent spacing, radius, or shadow usage
- duplicate semantic names
- direct palette usage instead of semantic usage
- design values defined in multiple sources of truth
- missing dark mode structure
- inconsistent typography roles
- broken or incomplete token naming

### 1.5 Output of This Phase

Produce an audit summary containing:

- detected stack
- detected Tailwind version
- detected styling strategy
- existing files worth preserving
- gaps in the current system
- recommended token architecture path

---

## Phase 2 — Design Source Extraction

Extract values from the best available design source.

### 2.1 Extraction Priority

Use this order of trust:

1. structured design source, MCP, or API
2. design token export JSON
3. existing code implementation
4. screenshots or exports
5. verbal description

### 2.2 Extract These Token Categories

#### A. Foundation Tokens

These are primitive values directly derived from design.

- color palettes
- typography scale
- font families
- font weights
- line heights
- letter spacing
- spacing scale
- sizing scale if present
- border radius scale
- shadows or elevation
- opacity values if explicit
- motion durations or easing if explicit
- breakpoints or container widths if explicit

#### B. Semantic Tokens

These define purpose, not raw appearance.

- background or surface
- foreground or text
- muted
- border
- ring or focus
- accent
- card
- popover
- primary
- secondary
- success
- warning
- danger or destructive
- info
- disabled
- overlay
- inverse roles if present

#### C. Component-Level Tokens

Extract if present or infer cautiously from consistent patterns.

- button states
- input states
- form field states
- badge variants
- card surface hierarchy
- modal or drawer surfaces
- table row states
- tabs or navigation states
- navbar or header tokens
- chip or tag tokens
- toast or alert states
- status indicators

### 2.3 Extract Interaction States

Where visible, identify:

- default
- hover
- active
- focus
- disabled
- selected
- error
- success
- loading
- pressed

### 2.4 Extract Theme Modes

If the design source includes multiple modes, extract each explicitly:

- light
- dark
- high-contrast
- brand themes
- contextual themes

Do not invent a full mode system unless the user asks for a proposed one.

---

## Phase 3 — Normalization and Confidence Classification

Different designers often structure Figma differently. Normalize everything before code generation.

### 3.1 Normalize Naming

Convert inconsistent design naming into stable engineering naming.

Examples of normalization goals:

- avoid random designer-specific labels
- avoid ambiguous names like `blue2`, `main`, `text dark 2`
- separate palette names from semantic names
- avoid tying semantic tokens to one brand color when intent is broader

### 3.2 Token Layers

Organize tokens into three layers:

#### Layer 1 — Foundation

Examples:

- `color.palette.blue.500`
- `space.4`
- `radius.md`
- `shadow.lg`

#### Layer 2 — Semantic

Examples:

- `color.text.primary`
- `color.surface.canvas`
- `color.border.default`
- `color.action.primary.bg`

#### Layer 3 — Component

Examples:

- `button.primary.bg.default`
- `input.border.focus`
- `card.surface.default`

### 3.3 Confidence Levels

Every extracted token should be categorized as one of:

- **Confirmed** — directly defined in source
- **Inferred** — strongly implied by visible pattern or scale
- **Assumed** — added as a system fallback for completeness
- **Missing** — required but unavailable in source

This is critical when working from screenshots or incomplete Figma files.

### 3.4 Handle Messy Figma Safely

If the source has inconsistent design decisions:

- cluster visually identical or near-identical values
- identify likely canonical values
- isolate one-off exceptions
- avoid promoting accidental mockup values into global tokens
- document conflicts instead of silently flattening them

---

## Phase 4 — Token Summary Before File Generation

Before writing or modifying files, produce a structured summary.

### Required Summary Format

```md
## Extracted Design System Summary

### Environment

- Framework:
- Router mode:
- Tailwind version:
- Existing token strategy:
- Recommended implementation path:

### Foundation Tokens

#### Colors

| Token | Value | Source | Confidence |
| ----- | ----- | ------ | ---------- |

#### Typography

| Role | Family | Size | Weight | Line Height | Letter Spacing | Confidence |
| ---- | ------ | ---- | ------ | ----------- | -------------- | ---------- |

#### Spacing

| Token | Value | Confidence |
| ----- | ----- | ---------- |

#### Radius

| Token | Value | Confidence |
| ----- | ----- | ---------- |

#### Shadows

| Token | Value | Confidence |
| ----- | ----- | ---------- |

### Semantic Tokens

| Token | Maps To | Confidence |
| ----- | ------- | ---------- |

### Component Tokens

| Token | Value / Mapping | Confidence |
| ----- | --------------- | ---------- |

### Missing / Ambiguous Areas

- If extraction confidence is high, proceed automatically.
- Pause only if major ambiguity would materially affect the generated system.
- When pausing, ask only targeted questions.

# Implementation Rules and Workflow

---

## Phase 5 — Choose the Right Implementation Path

**Do not assume one universal implementation.**

### 5.1 Tailwind v4 Projects

Prefer CSS-driven theming and token definition aligned with the project’s current approach.

- Use `@theme` when the project is using Tailwind v4 theme-variable workflows.
- Keep CSS variables and theme variables consistent.
- Avoid introducing unnecessary parallel config layers.

### 5.2 Tailwind v3 Projects

Use `tailwind.config.*` extension patterns when appropriate.

- **Extend** instead of replacing defaults.
- Map semantic tokens cleanly.
- Preserve existing utility behavior.

### 5.3 Existing Tokenized Projects

If the project already has a coherent token system:

- Extend or normalize it.
- Do not duplicate sources of truth.
- Do not create extra token files unless the user wants them.

### 5.4 File Creation Policy

Generate only what is needed. Possible outputs include, but are not limited to:

- Global CSS variables
- Tailwind config updates
- Theme variable definitions
- Token JSON export
- TypeScript token constants
- Font configuration updates
- Token documentation/usage guidelines

---

## Phase 6 — File Generation Rules

### 6.1 Source-of-Truth Rule

Prefer a single canonical token source whenever possible. If multiple artifacts are created, ensure their relationship is clear (Primary source vs. derived artifacts).

### 6.3 Naming Rule

Prefer **semantic usage** in components.

- **Good:** `bg-primary`, `text-muted-foreground`, `border-default`.
- **Avoid:** Encouraging authors to use raw palette tokens directly unless the system intentionally exposes them.

### 6.4 Dark Mode Rule

- If dark mode exists in source material, implement it.
- If it does not exist, **do not fabricate** a production-ready system silently.
- Optionally propose a provisional mapping if requested; otherwise, mark as "pending design input."

### 6.5 Font Rule

- Reuse existing font-loading strategies.
- If using Next.js font tooling, wire it according to project structure.
- Do not hardcode fonts in a way that conflicts with runtime loading.

### 6.6 Spacing and Scale Rule

- Extend default scales unless replacement is required.
- Align spacing scale to the identified base rhythm.

### 6.7 Accessibility Rule

Before finalizing, check for:

- Text contrast & focus visibility.
- Disabled-state clarity.
- Semantic state distinguishability (e.g., destructive vs. warning).
- **Report issues explicitly.**

---

## Phase 7 — Recommended Output Artifacts

Generate only the necessary subset.

- **Global token stylesheet:** CSS variables or theme variables (Light/Dark).
- **Tailwind integration:** Config extension or CSS theme integration.
- **Portable token export:** Optional JSON for tooling.
- **TypeScript token access:** Optional runtime constants for logic/metadata.
- **Design system documentation:** Token taxonomy, naming rules, and examples.
- **Audit or migration report:** Old values vs. normalized replacements.

---

## Phase 8 — Output Order

When generating implementation output, use this order:

1. **Audit summary**
2. **Extracted token summary**
3. **Recommended implementation approach**
4. **Generated or updated files**
5. **What changed and why**
6. **Usage guidance** for future development
7. **Open issues**, ambiguities, or follow-up suggestions
8. Generate a **design-system.md** file at the root of project documenting few use cases of how to use things in project.

## Phase 9 — Required Final Checklist

Always finish with:

## Design System Completion Checklist

### Detection

- [ ] Project structure detected
- [ ] Tailwind version identified
- [ ] Existing token strategy audited

### Token System

- [ ] Foundation tokens established
- [ ] Semantic tokens established
- [ ] Component token strategy defined where possible
- [ ] Confidence levels documented for extracted values

### Implementation

- [ ] Existing files preserved where appropriate
- [ ] Token source of truth is clear
- [ ] Tailwind integration matches project version
- [ ] Fonts aligned with project architecture
- [ ] Dark mode handled correctly based on source availability

### Developer Experience

- [ ] Components can use semantic utilities instead of raw values
- [ ] Token naming is normalized
- [ ] Future component authors have guidance
- [ ] Accessibility risks were reviewed

### Follow-up

- [ ] Missing or ambiguous tokens documented
- [ ] Migration path noted if legacy styles exist

### Pitfalls to Avoid

---

- **Do not assume App Router** if the project uses Pages Router.
- **Do not assume Tailwind v3 patterns** in a Tailwind v4 project.
- **Do not create duplicate token sources** without a reason.
- **Do not silently invent dark mode** as if it were design-approved.
- **Do not treat screenshot approximations** as fully confirmed values.
- **Do not preserve messy designer naming** directly in code.
- **Do not flatten palette, semantic, and component tokens** into one layer.
- **Do not replace the entire Tailwind config** when only an extension is needed.
- **Do not overwrite existing system files** destructively.
- **Do not expose raw one-off mockup values** as official global tokens.
- **Do not optimize only for “looks right”**; optimize for consistency and reuse.

### Skill Outcome

A successful execution of this skill should leave the project with:

- **A clear token architecture**
- **Normalized and scalable naming**
- **Consistent semantic usage**
- **Reduced design-to-code drift**
- **A maintainable foundation** for future component work
- **Fewer ad hoc styling decisions** during frontend development

The result should make future UI implementation easier, faster, more consistent, and less dependent on individual designer or developer interpretation.
```

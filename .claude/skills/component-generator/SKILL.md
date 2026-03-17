---
name: component-generator
description: >
  Analyze one or more design references and generate or modify production-grade,
  reusable UI components for a Next.js + TypeScript + Tailwind codebase. Use this
  skill when the user wants to create a new shared component, refactor an existing
  component, or adapt a component to match a Figma screenshot, design-system image,
  Figma URL, web URL, or existing project patterns. This skill must prioritize
  genericity, reusability, accessibility, token-awareness, composability, and
  alignment with the project’s current design system and component architecture.
  It should infer a clean component API, supported states, variants, sizes,
  composition opportunities, subcomponents, and integration constraints without
  hardcoding page-specific or product-specific behavior.
---

# Component Generator Skill

Generate, refactor, or extend reusable application-grade UI components from design references,
existing components, or project conventions.

This skill exists to convert visual or existing implementation references into
**well-architected shared components**, not one-off JSX.

The output must feel like it belongs in a serious design system and should be
ready to act as the canonical implementation used across the application.

---

## Core Principles

1. **Abstract, do not imitate**
   - Do not merely recreate the screenshot.
   - Infer the reusable component model behind the design.

2. **Adapt to the codebase**
   - Respect the project’s existing architecture, token naming, utility helpers,
     class strategy, export style, and component conventions.

3. **Prefer generic APIs**
   - Avoid page-specific text, business rules, or assumptions tied to a single screen.

4. **Use design tokens and semantic utilities**
   - Prefer semantic classes and project tokens over raw design values.

5. **Support real-world states**
   - Consider not only what is visible in the design, but what the component will
     realistically need in production.

6. **Accessibility is not optional**
   - Components must preserve semantic HTML, keyboard usability, and assistive
     technology compatibility by default.

7. **Choose the right abstraction level**
   - Not every design becomes a single component.
   - Some designs imply a primitive, some a wrapper, some a compound component,
     and some a small component family.

---

## When This Skill Should Be Used

Use this skill when the user wants to:

- create a reusable component from a Figma screenshot or design-system image
- convert a Figma or web design reference into React / Next.js / Tailwind code
- create a shared UI primitive or common component
- refactor an existing component to become more reusable
- modify an existing component to match updated design references
- infer props, variants, sizes, states, or architecture from a design
- create or update components such as:
  - Button
  - IconButton
  - Input
  - Textarea
  - Select shell
  - ButtonGroup / SegmentedControl
  - Checkbox / Radio / Switch
  - Tabs
  - Badge / Chip
  - Alert / Banner
  - Card
  - Modal / Drawer
  - Dropdown / Menu
  - Pagination
  - Toast
  - Empty state
  - FormField wrapper
  - Date picker shell
  - Table primitives
  - Navigation primitives
  - and similar reusable blocks

---

## When This Skill Should NOT Be Used

Do not use this skill when:

- the user only wants design commentary or critique
- the user only wants token extraction
- the user wants an image or screenshot recreation instead of code
- the user wants backend or business logic unrelated to the component
- the user wants a one-off page section with no reusable abstraction
- the design is too incomplete and the user only wants brainstorming, not implementation

---

## Supported Inputs

This skill can work from one or more of the following:

- screenshots shared by the user
- design-system screenshots
- Figma URLs
- web URLs
- existing component code
- existing project component patterns
- design token references
- state matrices
- user notes about interactions or behavior
- project constraints such as:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - design token naming
  - `cn()` utility
  - `cva` / `tailwind-variants` / custom variant helpers
  - icon library
  - form library
  - accessibility requirements
  - folder structure conventions
  - export conventions

---

## High-Level Responsibilities

When invoked, this skill must do all of the following:

1. analyze the reference deeply
2. detect whether this is a new component, a refactor, or a modification
3. infer the right abstraction level
4. design a clean and reusable API
5. align styling with the project’s token system
6. support visible and practical production states
7. preserve accessibility by default
8. output implementation-ready code and developer guidance

---

## Phase 1 — Identify the Task Type

Before generating anything, determine which of these applies:

### A. New Component Creation

Use when the user wants a reusable component built from a design reference.

### B. Existing Component Modification

Use when the user already has a component and wants:

- visual changes
- additional variants
- additional states
- API improvements
- design-system alignment
- accessibility fixes
- architecture cleanup

### C. Existing Component Refactor

Use when the current component exists but is too narrow, duplicated, inconsistent,
or tightly coupled to a page-specific use case.

### D. Component Family Extraction

Use when the design implies more than one related piece, such as:

- FormField + Input
- Tabs root + list + trigger + content
- SegmentedControl + item
- Card + subregions
- Table primitives

State clearly which path is being taken before implementation.

---

## Phase 2 — Analyze the Design or Existing Component

Do not stop at surface-level styling. Extract the full component model.

### 2.1 Determine the Component’s Purpose

Identify:

- what the component fundamentally does
- whether it is informational, interactive, structural, or input-oriented
- whether it is a primitive or a composed pattern
- whether it is standalone or part of a family

### 2.2 Extract Visual Structure

Identify:

- layout structure
- spacing rhythm
- border treatment
- radius pattern
- icon placement
- typography hierarchy
- content regions
- grouping or nesting patterns
- repeated structures across states or variants

### 2.3 Extract Variants

Identify whether the design implies:

- visual variants
- semantic variants
- density variants
- style variants
- orientation variants
- layout variants

Examples:

- solid / outline / ghost
- neutral / brand / destructive
- inline / stacked
- vertical / horizontal

### 2.4 Extract Sizes

Identify whether height, padding, gap, icon size, or text size changes systematically.

If yes, model these as size tiers where appropriate.

### 2.5 Extract States

Capture visible and implied states such as:

- default
- hover
- focus
- active / pressed
- selected
- disabled
- loading
- readOnly
- invalid / error
- success
- warning
- info
- expanded / collapsed
- open / closed

### 2.6 Extract Content Behavior

Identify:

- label behavior
- helper text patterns
- description/message placement
- icon optionality
- left/right slots
- prefix/suffix usage
- whether content is fixed, optional, or slot-based

### 2.7 Detect Composition Opportunities

Infer whether the design suggests:

- a single primitive
- a wrapper around a primitive
- a compound component
- a root-plus-item pattern
- a family of related components

---

## Phase 3 — Infer the Correct Abstraction Level

Choose the lightest abstraction that still supports real reuse.

### Prefer a single component when:

- the structure is simple
- all variants share the same internal shape
- composition would add noise

### Prefer a wrapper + primitive when:

- there is a standard field shell plus a core control
- the control should still be usable standalone

### Prefer a compound component when:

- there are multiple coordinated regions
- the user may need flexible composition
- the design clearly separates subparts

### Prefer a small component family when:

- multiple related pieces appear repeatedly
- a single monolithic API would become bloated

Examples:

- Button → likely a single component
- Input with label/helper/error → possibly `FormField` + `Input`
- Tabs → likely compound primitives
- Segmented control → likely root + item
- Card with header/body/footer → either slots or subcomponents depending on complexity

---

## Phase 4 — Design the Component API

The goal is not to expose every imaginable prop. The goal is to expose the **right**
props for scalable use.

### 4.1 Prop Categories to Consider

When designing the API, evaluate:

- standard HTML props
- variant props
- size props
- semantic state props
- icon props
- slot props
- content props
- controlled props
- uncontrolled props
- accessibility props
- styling override props
- extensibility props
- composition props

### 4.2 Decision Framework

#### Make it a `size` prop if:

- the component appears in multiple size tiers
- height, padding, gap, icon size, or text size changes systematically

#### Make it a `variant` prop if:

- the role changes visually but the structure remains similar

#### Make it a semantic `status` or `state` prop if:

- feedback meaning changes
- validation or state semantics matter

#### Make it a slot or icon prop if:

- the design supports optional leading/trailing visuals
- consumers may need control over those visuals

#### Make it controlled if:

- the component represents a selected value, open state, active item,
  or another externally driven UI state

#### Make it compound if:

- multiple coordinated child regions need flexible layout or authoring

#### Keep it internal if:

- exposing it would make the API brittle, noisy, or implementation-specific

### 4.3 API Quality Rules

The component API must be:

- intentional
- discoverable
- generic
- not page-specific
- not overloaded with rarely useful props
- aligned with the visual model implied by the design

Avoid:

- giant prop bags
- business-domain prop names
- leaking styling implementation details
- exposing toggles for every tiny CSS choice

---

## Phase 5 — Align With the Project

Before writing code, align with the codebase if context is available.

### 5.1 Detect Existing Conventions

Reuse or align with existing project choices such as:

- folder structure
- export style
- file naming
- utility functions like `cn()`
- class strategy
- `cva`, `tailwind-variants`, or handwritten classes
- icon library
- form wrappers
- shared primitives
- accessibility conventions
- token names
- import aliases

### 5.2 Token Alignment

Generated components must:

- use semantic design token classes where possible
- avoid raw hex values
- avoid arbitrary pixel values unless unavoidable
- align with existing spacing and typography scales
- use placeholder semantic tokens only when the real names are unavailable

Bad:

- `bg-[#5869F7]`
- `text-[13px]`
- `border-[#D0D5DD]`

Preferred:

- `bg-primary`
- `text-foreground`
- `border-border`
- `text-sm`
- `rounded-md`
- `focus-visible:ring-ring`

If the token names are unknown, use sensible semantic placeholders and state that assumption clearly.

---

## Phase 6 — Accessibility Requirements

All generated or modified components must preserve accessibility by default.

### 6.1 General Accessibility Expectations

Consider:

- semantic HTML
- keyboard interaction
- focus-visible behavior
- accessible labeling
- disabled semantics
- `aria-invalid`
- `aria-describedby`
- icon-only labeling
- proper roles for composite widgets
- tab order
- screen-reader announcements when relevant

### 6.2 Accessibility Rules by Type

Examples:

- buttons should use `<button>` unless there is a strong reason not to
- icon-only buttons need an accessible label
- form controls need label association and message association
- interactive grouped controls need keyboard navigation if acting as a chooser
- loading states should not silently hide meaning from screen readers

Do not create inaccessible `div`-based controls when semantic elements exist.

---

## Phase 7 — Screenshot and URL Interpretation Rules

### 7.1 If the Input Is a Screenshot

When using screenshots:

- inspect text hierarchy
- inspect spacing rhythm
- inspect radius and border patterns
- inspect icon placement
- inspect visible state changes across rows and columns
- inspect labels, hints, and validation structures
- distinguish constants from variable regions
- infer component families from repeated patterns

Do not treat placeholder text in screenshots as literal production content.

### 7.2 If the Input Is a Figma or Web URL

When using a URL:

- inspect the design content first
- identify visible variants, states, and structure
- infer reusable architecture from repeated patterns
- do not rely solely on node names
- if detail is insufficient, state what is missing and make careful assumptions

### 7.3 If the Input Is Existing Component Code

When modifying an existing component:

- identify what should be preserved
- identify what is overfit or duplicated
- identify where the current API is too narrow or too noisy
- improve architecture without rewriting unrelated logic
- keep changes targeted unless the user explicitly wants a full refactor

---

## Phase 8 — Ambiguity Handling

Design references are rarely complete. Separate what can be inferred from what must be flagged.

### 8.1 Infer Silently

These can usually be inferred safely:

- approximate spacing values, snapped to the nearest sensible scale
- likely icon choice for a visible shape
- whether decorative icons should be `aria-hidden`
- minor hover/active treatment consistent with the visual system
- `displayName` values
- whether `className` passthrough is useful

### 8.2 Assume and Explicitly Flag

These can be assumed, but must be documented in the output:

- token names not visible in the codebase
- whether `asChild` is needed for a button-like primitive
- whether a visible label should be optional in the final API
- responsive behavior not shown in the design
- whether a shown icon should be consumer-provided or internally fixed when the design strongly suggests one direction

### 8.3 Ask Only for Blocking Ambiguities

Pause only when ambiguity materially affects the public API or behavior, such as:

- two structurally different APIs are equally plausible
- the component boundary is unclear
- a slot’s content type is fundamentally ambiguous
- the core interaction model is unclear
- a required token or convention is impossible to infer safely

When asking, provide concrete options and a default.

Example:

The design shows a leading icon in every item. Should this be:
A) a fixed internal icon, or
B) a consumer-provided `leadingIcon?: React.ReactNode`?
I will default to B if you do not specify.

## Phase 9 — Code Generation Standards

The output must be implementation-ready, readable, and aligned with shared UI library expectations.

### 9.1 Code Quality Requirements

Generated code should be:

- **TypeScript-first:** Strong typing for props, variants, and events.
- **Production-oriented:** Handles edge cases, loading states, and disabled behaviors.
- **Readable:** Clear naming and clean logic flow.
- **Composable:** Uses children or slots to allow flexibility.
- **Not over-engineered:** Avoids unnecessary complexity or deep nesting.
- **Not page-specific:** Removes business logic to keep the component generic.
- **Easy to adopt:** Minimal setup required for other developers to use.

### 9.2 Technical Defaults

Unless specified otherwise, use these standards:

- **Framework:** React with Next.js compatibility (Server/Client component awareness).
- **Language:** TypeScript.
- **Styling:** Tailwind CSS.
- **Class Merging:** Use a `cn()` utility (e.g., `clsx` + `tailwind-merge`) if the project uses it.
- **Variants:** Use `cva` (Class Variance Authority) or equivalent only when helpful for complex state management.
- **Refs:** Implement `forwardRef` for form controls, buttons, and other primitives to support library integrations (like React Hook Form).
- **Accessibility:** ARIA attributes and semantic HTML on by default.
- **Icons:** Use a generic `icon` prop or slot pattern to avoid hardcoding a specific library.
- **Export Style:** Follow the repository’s existing convention (Named vs. Default).

### 9.3 File Structure

Generate the minimum necessary structure to keep the codebase clean. A common default is:

```

components/
      common/
         ComponentName/
         ComponentName.tsx
         ComponentName.types.ts
         index.ts
         README.md

```

### 9.4 Import Order

If imports are generated, prefer this order when applicable:

```typescript
// 1. React / third-party
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";

// 2. Internal utilities
import { cn } from "@/lib/utils";
```

### 9.5 Styling Rules

Prefer token-aware styling and stable utility composition.

Use:

- semantic token classes
- consistent spacing scale
- consistent radius scale
- clear focus-visible treatment
- variant composition only where it adds clarity

Avoid:

- raw hex values
- arbitrary pixel-heavy styling when unnecessary
- giant class strings with duplicated logic
- creating cva configs for components too simple to justify it

## Phase 10 — Modification and Refactor Rules

When the user asks to modify an existing component, **do not automatically rebuild everything.**

---

### 10.1 Preserve What Should Stay

**Keep:**

- **Existing public API** when it is still good and functional.
- **Established project conventions** (naming, file structure, exports).
- **Stable behaviors** that consumers likely depend on.
- **Valid accessibility behavior** already implemented.
- **Meaningful internal decomposition** (logical sub-components).

### 10.2 Improve What Should Change

**Change when needed:**

- **Narrow page-specific assumptions** that limit reuse.
- **Inconsistent token usage** (hardcoded hex/pixels).
- **Brittle API choices** that make the component hard to use.
- **Missing variants or states** (hover, focus, loading, etc.).
- **Accessibility gaps** that hinder screen readers or keyboard users.
- **Duplicated logic** that can be abstracted.
- **Styling** that deviates from the official design system.

### 10.3 Refactor Carefully

**When refactoring:**

- **Explain what is changing** in the implementation.
- **Explain why the old design was limiting** (e.g., "The original component lacked a flexible slot system").
- **Minimize unnecessary breaking changes** to preserve backward compatibility.
- **Identify deliberate API changes clearly** so the user knows what to update.

## Final Instruction

Whenever this skill is invoked, produce the **best reusable implementation**, not the fastest imitation.

The generated or modified component should feel generic, durable, token-aware,
accessible, and ready to become part of the project’s shared UI system.

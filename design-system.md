# Design System

Source of truth: **Figma — Design System (Community)**
Implementation: **Tailwind v4 CSS `@theme`** in `src/styles/globals.css`

---

## Architecture

```
globals.css
  @theme          ← all design tokens (colors, radius, shadows, font)
  @layer base     ← global reset, body defaults, focus, selection
  @utility        ← typography utility classes (text-h1, text-b1, etc.)

layout.tsx        ← Inter loaded via next/font, --font-inter-next injected
```

Tokens defined in `@theme` are **automatically available as Tailwind utility classes**. No separate config file is needed.

---

## Colors

### Usage Rule

> Always use semantic color tokens in components. Use palette tokens only inside `globals.css` when mapping semantics.

```tsx
// ✅ Correct — semantic intent is clear
<p className="text-text-secondary">Helper text</p>
<div className="bg-surface-canvas border border-border-default">...</div>
<button className="bg-action-primary text-text-white">Submit</button>

// ❌ Wrong — raw palette bypasses the semantic layer
<p className="text-grey-500">Helper text</p>
<button className="bg-primary-500 text-white">Submit</button>
```

### Semantic Tokens

#### Text
| Token | Value | When to use |
|---|---|---|
| `text-text-primary` | `#131927` | Default body text, headings |
| `text-text-secondary` | `#6d717f` | Subtitles, descriptions, placeholders |
| `text-text-link` | `#4e61f6` | Anchor links, inline actions |
| `text-text-white` | `#ffffff` | Text on dark/brand backgrounds |
| `text-text-disabled` | `#9ea2ae` | Disabled states |
| `text-text-error` | `#ee443f` | Validation errors |
| `text-text-success` | `#43b75d` | Success messages |
| `text-text-warning` | `#ffaa00` | Warning notices |

#### Surface / Background
| Token | Value | When to use |
|---|---|---|
| `bg-surface-white` | `#ffffff` | Cards, modals, default page bg |
| `bg-surface-light` | `#f9fafb` | Subtle alternate rows, sidebars |
| `bg-surface-canvas` | `#f3f4f6` | Page backgrounds behind cards |

#### Border
| Token | Value | When to use |
|---|---|---|
| `border-border-default` | `#d2d5db` | Default input/card borders |
| `border-border-strong` | `#9ea2ae` | Emphasized borders |
| `border-border-focus` | `#4e61f6` | Focus ring on inputs |
| `border-border-error` | `#ee443f` | Error state borders |
| `border-border-success` | `#43b75d` | Success state borders |

#### Action / Brand
| Token | Value | When to use |
|---|---|---|
| `bg-action-primary` | `#4e61f6` | Primary buttons, links bg |
| `bg-action-primary-hover` | `#4758e0` | Primary button hover |
| `bg-action-primary-active` | `#3745af` | Primary button active/pressed |
| `bg-action-primary-subtle` | `#edeffe` | Subtle brand tinted areas |

#### Status
| Token | When to use |
|---|---|
| `bg-status-success`, `text-status-success` | Success alerts, badges |
| `bg-status-success-bg` | Success alert backgrounds |
| `bg-status-warning`, `text-status-warning` | Warning alerts |
| `bg-status-warning-bg` | Warning alert backgrounds |
| `bg-status-error`, `text-status-error` | Error alerts |
| `bg-status-error-bg` | Error alert backgrounds |
| `bg-status-info`, `text-status-info` | Info alerts |
| `bg-status-info-bg` | Info alert backgrounds |

### Palette Tokens

Available as `bg-primary-*`, `text-primary-*`, `border-primary-*` etc. for all scales:

| Scale | Steps | Brand step |
|---|---|---|
| `primary` | 50–900 | 500 = `#4e61f6` |
| `grey` | 50–900 | 900 = `#131927` |
| `green` | 50–900 | 500 = `#43b75d` |
| `red` | 50–900 | 500 = `#ee443f` |
| `yellow` | 50–900 | 500 = `#ffaa00` |
| `blue` | 50–900 | 500 = `#0095ff` |

---

## Typography

Font family: **Inter** (loaded via `next/font/google`, variable weight).

Use the `text-*` utility classes below instead of composing `text-[size]`, `font-*`, and `leading-*` individually.

### Heading Scale

```tsx
<h1 className="text-h1 text-text-primary">Page title</h1>
<h2 className="text-h2 text-text-primary">Section title</h2>
<h3 className="text-h3 text-text-primary">Subsection</h3>
<h4 className="text-h4 text-text-primary">Card heading</h4>
<h5 className="text-h5 text-text-primary">Widget heading</h5>
```

| Class | Size | Line-height | Weight |
|---|---|---|---|
| `text-h1` | 48px | 58px | 600 |
| `text-h2` | 40px | 48px | 600 |
| `text-h3` | 32px | 38px | 600 |
| `text-h4` | 28px | 34px | 600 |
| `text-h5` | 24px | 28px | 600 |

### Subtitle Scale

```tsx
<p className="text-s1 text-text-primary">Section subtitle</p>
<p className="text-s2 text-text-secondary">Card subtitle</p>
```

| Class | Size | Line-height | Weight |
|---|---|---|---|
| `text-s1` | 18px | 28px | 600 |
| `text-s2` | 16px | 24px | 600 |

### Body Scale

```tsx
<p className="text-b1 text-text-primary">Regular body text</p>
<p className="text-b2 text-text-primary">Medium-weight body text</p>
<p className="text-b3 text-text-secondary">Small body text</p>
<p className="text-b4 text-text-secondary">Small medium-weight body</p>
```

| Class | Size | Line-height | Weight |
|---|---|---|---|
| `text-b1` | 16px | 24px | 400 (Regular) |
| `text-b2` | 16px | 24px | 500 (Medium) |
| `text-b3` | 14px | 20px | 400 (Regular) |
| `text-b4` | 14px | 20px | 500 (Medium) |

### Caption Scale

```tsx
<span className="text-c1 text-text-secondary">Helper text</span>
<span className="text-c2 text-text-secondary">Emphasized helper</span>
<span className="text-c3 text-text-disabled">Micro label</span>
<label className="text-label text-text-primary">Input label</label>
```

| Class | Size | Line-height | Weight |
|---|---|---|---|
| `text-c1` | 12px | 16px | 400 |
| `text-c2` | 12px | 16px | 500 |
| `text-c3` | 10px | 14px | 500 |
| `text-label` | 12px | 16px | 500 |

### Button Text Sizes

```tsx
<button className="text-btn-giant ...">Giant CTA</button>
<button className="text-btn-large ...">Large CTA</button>
<button className="text-btn-medium ...">Default button</button>
<button className="text-btn-small ...">Small button</button>
<button className="text-btn-tiny ...">Tiny button</button>
```

| Class | Size | Line-height | Weight |
|---|---|---|---|
| `text-btn-giant` | 18px | 24px | 600 |
| `text-btn-large` | 16px | 20px | 600 |
| `text-btn-medium` | 14px | 16px | 600 |
| `text-btn-small` | 12px | 16px | 600 |
| `text-btn-tiny` | 10px | 12px | 600 |

---

## Spacing

Tailwind's default 4px-base spacing scale is used. No custom overrides.

```tsx
// Spacing examples
<div className="p-4">   {/* 16px */}
<div className="p-6">   {/* 24px */}
<div className="p-8">   {/* 32px */}
<div className="gap-4">  {/* 16px gap */}
<div className="mt-2">   {/* 8px top margin */}
```

---

## Border Radius

| Token | Tailwind class | Value | Use case |
|---|---|---|---|
| none | `rounded-none` | 0px | Sharp corners |
| xs | `rounded-xs` | 4px | Tags, badges, focus rings |
| sm | `rounded-sm` | 8px | Buttons (all sizes) |
| md | `rounded-md` | 12px | Cards, panels |
| lg | `rounded-lg` | 16px | Larger cards |
| xl | `rounded-xl` | 24px | Modals, hero cards |
| 2xl | `rounded-2xl` | 32px | Feature panels |
| full | `rounded-full` | 9999px | Pills, avatars |

```tsx
<button className="rounded-sm ...">Button</button>
<div className="rounded-md ...">Card</div>
<div className="rounded-xl ...">Modal</div>
```

---

## Shadows (Elevation)

8-level scale. Higher number = more elevation. Base color: `#131927`.

| Class | Use case |
|---|---|
| `shadow-100` | Subtle hover lift, inline dropdowns |
| `shadow-200` | Cards at rest |
| `shadow-300` | Cards on hover |
| `shadow-400` | Sticky headers, floating actions |
| `shadow-500` | Dropdowns, popovers |
| `shadow-600` | Drawers, side panels |
| `shadow-700` | Modals |
| `shadow-800` | Full-screen overlays, toasts |

```tsx
<div className="shadow-200 rounded-md bg-surface-white p-4">Card</div>
<div className="shadow-700 rounded-xl bg-surface-white p-6">Modal</div>
```

---

## Component Conventions

When building components, follow this pattern:

```tsx
// ✅ Use semantic tokens, typography utilities, and scale-based radius/shadow
function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-surface-white border border-border-default rounded-md shadow-200 p-6">
      <h3 className="text-h5 text-text-primary">{title}</h3>
      <p className="mt-2 text-b1 text-text-secondary">{body}</p>
    </div>
  );
}

// ✅ Status badge
function Badge({ status }: { status: "success" | "error" | "warning" }) {
  const styles = {
    success: "bg-status-success-bg text-status-success",
    error: "bg-status-error-bg text-status-error",
    warning: "bg-status-warning-bg text-status-warning",
  };
  return (
    <span className={`text-label rounded-xs px-2 py-0.5 ${styles[status]}`}>
      {status}
    </span>
  );
}
```

---

## Dos and Don'ts

| Do | Don't |
|---|---|
| `text-text-primary` | `text-[#131927]` or `text-gray-900` |
| `bg-surface-canvas` | `bg-[#f3f4f6]` or `bg-gray-100` |
| `text-h2` | `text-4xl font-semibold leading-[48px]` |
| `shadow-300` | `shadow-[0px_8px_16px_...]` |
| `rounded-md` | `rounded-[12px]` |
| `border-border-error` | `border-red-500` |
| `bg-action-primary hover:bg-action-primary-hover` | `bg-primary-500 hover:bg-primary-600` |

---

## Adding New Tokens

All tokens live in `src/styles/globals.css` inside `@theme`.

1. Add the CSS variable inside the appropriate `@theme` section
2. Tailwind v4 auto-generates the utility class from the variable name
3. For typography styles, add a new `@utility` block below the existing ones
4. Document it in this file

**Example — adding a new semantic color:**
```css
/* in globals.css @theme block */
--color-surface-dark: #212936;
```
```tsx
/* now usable anywhere */
<div className="bg-surface-dark text-text-white">Dark panel</div>
```

---

## Token Source

All values sourced from Figma: **Design System (Community)**
Node references: Colors `18:19` · Typography `7:4` · Font `27:2530` · Shadows `118:1723`

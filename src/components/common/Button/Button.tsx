"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "giant" | "large" | "medium" | "small" | "tiny";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. Defaults to "primary". */
  variant?: ButtonVariant;
  /** Size tier of the button. Defaults to "medium". */
  size?: ButtonSize;
  /** Icon rendered before the label. */
  leadingIcon?: React.ReactNode;
  /** Icon rendered after the label. */
  trailingIcon?: React.ReactNode;
  /**
   * Renders an icon-only button (square, no label).
   * When true, children/label is visually hidden — `aria-label` is required.
   */
  iconOnly?: boolean;
  /** Stretches the button to the full width of its container. */
  fullWidth?: boolean;
  /**
   * Shows a loading spinner and disables interaction.
   * The button remains in the DOM in a disabled state.
   */
  loading?: boolean;
}

// ─── Size map ─────────────────────────────────────────────────────────────────
// Heights confirmed from Figma: Giant=56px, Large=48px, Medium=40px, Small=32px, Tiny=24px
// All sizes use rounded-md (12px) per Figma Spacing System/radius-sm.
// Typography classes come from the design-system @utility definitions.

const SIZE_STYLES = {
  giant: {
    button: "h-14 px-6 gap-2",
    iconOnly: "size-14",
    typography: "text-btn-giant",
    icon: "size-6", // 24px
  },
  large: {
    button: "h-12 px-5 gap-2",
    iconOnly: "size-12",
    typography: "text-btn-large",
    icon: "size-5", // 20px
  },
  medium: {
    button: "h-10 px-4 gap-1.5",
    iconOnly: "size-10",
    typography: "text-btn-medium",
    icon: "size-4", // 16px
  },
  small: {
    button: "h-8 px-3 gap-1",
    iconOnly: "size-8",
    typography: "text-btn-small",
    icon: "size-4", // 16px
  },
  tiny: {
    button: "h-6 px-2 gap-1 rounded-sm",
    iconOnly: "size-6 rounded-sm",
    typography: "text-btn-tiny",
    icon: "size-3", // 12px
  },
} satisfies Record<
  ButtonSize,
  { button: string; iconOnly: string; typography: string; icon: string }
>;

// ─── Variant map ──────────────────────────────────────────────────────────────
// Sourced from Figma button component:
//   Filled  → bg Primary/500, white text
//   Outline → transparent bg, Primary/500 border (1.5px) + text
//   Clear   → transparent bg + border, Primary/500 text only

const VARIANT_STYLES = {
  primary: [
    // Base
    "bg-action-primary text-text-white border border-transparent",
    // Hover
    "hover:bg-action-primary-hover",
    // Active / press
    "active:bg-action-primary-active",
    // Disabled — handled via disabled: modifier
    "disabled:bg-grey-200 disabled:text-text-disabled disabled:border-transparent",
  ].join(" "),

  outline: [
    // Base — 1.5px border per Figma spec
    "bg-transparent text-action-primary border-[1.5px] border-action-primary",
    // Hover
    "hover:bg-action-primary-subtle hover:border-action-primary-hover hover:text-action-primary-hover",
    // Active / press
    "active:bg-primary-100 active:border-action-primary-active active:text-action-primary-active",
    // Disabled
    "disabled:bg-transparent disabled:text-text-disabled disabled:border-border-default",
  ].join(" "),

  ghost: [
    // Base — no background, no border
    "bg-transparent text-action-primary border border-transparent",
    // Hover
    "hover:bg-action-primary-subtle",
    // Active / press
    "active:bg-primary-100 active:text-action-primary-active",
    // Disabled
    "disabled:bg-transparent disabled:text-text-disabled",
  ].join(" "),
} satisfies Record<ButtonVariant, string>;

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      leadingIcon,
      trailingIcon,
      iconOnly = false,
      fullWidth = false,
      loading = false,
      disabled,
      className,
      children,
      type = "button",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    if (
      process.env.NODE_ENV !== "production" &&
      iconOnly &&
      !ariaLabel &&
      !props["aria-labelledby"]
    ) {
      console.warn(
        "[Button] Icon-only buttons require an `aria-label` or `aria-labelledby` prop for accessibility."
      );
    }

    const isDisabled = disabled || loading;
    const sizeStyle = SIZE_STYLES[size];

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
        className={cn(
          // ── Layout
          "inline-flex items-center justify-center",
          // ── Shape
          "rounded-md",
          // ── Typography base (font-family inherited from body via design system)
          "font-sans whitespace-nowrap select-none",
          // ── Transitions
          "transition-colors duration-150",
          // ── Focus ring
          "focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2",
          // ── Disabled — block pointer events globally so hover does not fire
          "disabled:pointer-events-none",
          // ── Size
          iconOnly ? sizeStyle.iconOnly : sizeStyle.button,
          sizeStyle.typography,
          // ── Variant
          VARIANT_STYLES[variant],
          // ── Full width
          fullWidth && "w-full",
          // ── Consumer overrides (merged via tailwind-merge)
          className
        )}
        {...props}
      >
        {loading ? (
          // Loading state — spinner replaces all content
          <Spinner className={sizeStyle.icon} />
        ) : iconOnly ? (
          // Icon-only mode — render a single icon, centered
          <span
            className={cn(
              "inline-flex items-center justify-center shrink-0 [&>svg]:size-full",
              sizeStyle.icon
            )}
            aria-hidden="true"
          >
            {leadingIcon ?? children}
          </span>
        ) : (
          // Standard mode — leading icon · label · trailing icon
          <>
            {leadingIcon && (
              <span
                className={cn(
                  "inline-flex items-center justify-center shrink-0 [&>svg]:size-full",
                  sizeStyle.icon
                )}
                aria-hidden="true"
              >
                {leadingIcon}
              </span>
            )}
            {children}
            {trailingIcon && (
              <span
                className={cn(
                  "inline-flex items-center justify-center shrink-0 [&>svg]:size-full",
                  sizeStyle.icon
                )}
                aria-hidden="true"
              >
                {trailingIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

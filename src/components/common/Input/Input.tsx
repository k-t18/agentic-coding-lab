"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type InputStatus = "default" | "success" | "info" | "warning" | "error";
export type InputSize = "large" | "medium";
export type InputVariant = "outline" | "filled";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Text label rendered above the input. */
  label?: string;
  /**
   * Helper / validation message rendered below the input.
   * Color is driven automatically by `status`.
   * With RHF: pass `errors.fieldName?.message` here.
   */
  helperText?: string;
  /**
   * Validation or contextual status.
   * Drives border color and helper text color.
   * With RHF: `status={errors.email ? "error" : "default"}`
   * Defaults to "default".
   */
  status?: InputStatus;
  /**
   * Size tier.
   * Large → 48px field height (12px padding).
   * Medium → 40px field height (8px padding).
   * Defaults to "medium".
   */
  size?: InputSize;
  /**
   * Background style.
   * outline → transparent background.
   * filled  → light grey background (Grey/50).
   * Defaults to "outline".
   */
  variant?: InputVariant;
  /** Icon rendered before the input field. */
  leadingIcon?: React.ReactNode;
  /** Icon rendered after the input field. */
  trailingIcon?: React.ReactNode;
}

// ─── Status style map ─────────────────────────────────────────────────────────
// Border colors sourced from Figma (node 57:892).
// Default uses hover: + focus-within: for interactive states.
// Status states keep their border color regardless of focus.

const STATUS_STYLES: Record<
  InputStatus,
  { wrapper: string; helper: string }
> = {
  default: {
    wrapper:
      "border-grey-200 hover:border-grey-300 focus-within:border-primary-500",
    helper: "text-text-secondary",
  },
  success: {
    wrapper: "border-status-success",
    helper: "text-status-success",
  },
  info: {
    wrapper: "border-status-info",
    helper: "text-status-info",
  },
  warning: {
    wrapper: "border-status-warning",
    helper: "text-status-warning",
  },
  error: {
    wrapper: "border-status-error",
    helper: "text-status-error",
  },
};

// ─── Size style map ───────────────────────────────────────────────────────────
// Large: p-3 (12px) — 12 + 24(line-height) + 12 = 48px field height
// Medium: py-2 px-3 (8px/12px) — 8 + 24 + 8 = 40px field height

const SIZE_STYLES: Record<InputSize, string> = {
  large: "px-3 py-3",
  medium: "px-3 py-2",
};

// ─── Input ────────────────────────────────────────────────────────────────────

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      status = "default",
      size = "medium",
      variant = "outline",
      leadingIcon,
      trailingIcon,
      disabled,
      id: idProp,
      className,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    const helperId = helperText ? `${id}-helper` : undefined;

    const isDisabled = disabled;
    const statusStyle = STATUS_STYLES[status];

    return (
      <div className="flex w-full flex-col gap-2">
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-b2 text-text-primary",
              isDisabled && "text-text-disabled",
            )}
          >
            {label}
          </label>
        )}

        {/* Input wrapper — border and background live here */}
        <div
          className={cn(
            // Layout
            "flex w-full items-center",
            // Shape
            "rounded-md border-[1.5px]",
            // Transition
            "transition-colors duration-150",
            // Size padding
            SIZE_STYLES[size],
            // Background
            variant === "filled"
              ? "bg-surface-light"
              : "bg-transparent",
            // Status border (includes hover + focus-within for default)
            statusStyle.wrapper,
            // Disabled — overrides all interactive states
            isDisabled && [
              "border-grey-200 bg-surface-light",
              "opacity-60 cursor-not-allowed",
              // Prevent hover/focus-within from firing on the wrapper
              "pointer-events-none",
            ],
          )}
        >
          {leadingIcon && (
            <span className="mr-2 inline-flex shrink-0 items-center text-text-disabled [&>svg]:size-4" aria-hidden>
              {leadingIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            disabled={isDisabled}
            aria-describedby={helperId}
            aria-invalid={status === "error" ? true : undefined}
            className={cn(
              // Layout
              "min-w-0 flex-1 bg-transparent",
              // Typography — B1 body, primary text
              "text-b1 text-text-primary",
              // Placeholder
              "placeholder:text-text-disabled",
              // Remove native focus ring — visual focus is on the wrapper border
              "outline-none",
              // Disabled cursor
              "disabled:cursor-not-allowed",
              className,
            )}
            {...props}
          />

          {trailingIcon && (
            <span className="ml-2 inline-flex shrink-0 items-center text-text-disabled [&>svg]:size-4" aria-hidden>
              {trailingIcon}
            </span>
          )}
        </div>

        {/* Helper / validation text */}
        {helperText && (
          <p
            id={helperId}
            className={cn(
              "text-b3",
              statusStyle.helper,
              isDisabled && "text-text-disabled",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };

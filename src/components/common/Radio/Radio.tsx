"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RadioLabelPosition = "left" | "right";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Visible text label. Omit for standalone radio (provide aria-label instead). */
  label?: string;
  /**
   * Position of the label relative to the radio circle.
   * Defaults to "right".
   */
  labelPosition?: RadioLabelPosition;
}

// ─── Radio ────────────────────────────────────────────────────────────────────

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, labelPosition = "right", disabled, className, id: idProp, ...props }, ref) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;

    return (
      <label
        htmlFor={id}
        className={cn(
          // Layout
          "group inline-flex items-center gap-4",
          // Cursor — self-referential has() to switch cursor when child is disabled
          "cursor-pointer has-[:disabled]:cursor-not-allowed",
        )}
      >
        {/* Hidden native input — source of truth for all states */}
        <input
          ref={ref}
          id={id}
          type="radio"
          disabled={disabled}
          className="sr-only"
          {...props}
        />

        {/* Custom radio circle */}
        <div
          className={cn(
            // Shape & size — 24×24, fully rounded (circle)
            "relative flex shrink-0 items-center justify-center",
            "size-6 rounded-full border-[1.5px]",
            // Transition
            "transition-all duration-150",
            // Default border — Primary/500 per Figma (applies to all non-disabled states)
            "border-primary-500",
            // Hover — darkens to Primary/600, only when not disabled
            !disabled && "group-hover:border-action-primary-hover",
            // Focus-visible ring — triggered when native input is focused via keyboard
            "group-has-[:focus-visible]:ring-2",
            "group-has-[:focus-visible]:ring-primary-300",
            "group-has-[:focus-visible]:ring-offset-2",
            // Disabled — grey border, reduced opacity
            disabled && "border-grey-200 opacity-60",
          )}
        >
          {/* Inner selection dot — 12px, centered, shown when checked */}
          <span
            className={cn(
              "size-3 rounded-full",
              "transition-transform duration-150",
              // Hidden by default
              "scale-0",
              // Visible when checked
              "group-has-[:checked]:scale-100",
              // Color
              disabled ? "bg-grey-400" : "bg-action-primary",
            )}
          />
        </div>

        {/* Label text */}
        {label && (
          <span
            className={cn(
              "text-b1 select-none",
              disabled ? "text-text-disabled" : "text-text-primary",
              // Move label before the circle when labelPosition is "left"
              labelPosition === "left" && "order-first",
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  },
);

Radio.displayName = "Radio";

export { Radio };

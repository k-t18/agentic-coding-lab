import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RadioGroupOrientation = "vertical" | "horizontal";

export interface RadioGroupProps {
  /** Accessible label for the group — renders as a <legend>. */
  label?: string;
  /** Stack direction of the radio items. Defaults to "vertical". */
  orientation?: RadioGroupOrientation;
  children: React.ReactNode;
  className?: string;
}

// ─── RadioGroup ───────────────────────────────────────────────────────────────
// Uses <fieldset> + <legend> for correct screen-reader semantics.
// Radio items inside the group share the same `name` prop (spread via RHF's
// register or passed manually) to form a mutually exclusive set.

function RadioGroup({
  label,
  orientation = "vertical",
  children,
  className,
}: RadioGroupProps) {
  return (
    <fieldset className={cn("m-0 min-w-0 border-0 p-0", className)}>
      {label && (
        <legend className="mb-3 w-full px-0 text-b2 text-text-primary">
          {label}
        </legend>
      )}

      <div
        className={cn(
          "flex",
          orientation === "vertical"
            ? "flex-col gap-3"
            : "flex-row flex-wrap gap-x-6 gap-y-3",
        )}
      >
        {children}
      </div>
    </fieldset>
  );
}

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };

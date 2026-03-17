"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useTabsContext } from "./Tabs";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TabsTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** Unique identifier that matches a <TabsContent value="...">. */
  value: string;
  /** Optional leading icon rendered before the label. */
  leadingIcon?: React.ReactNode;
  /** Optional trailing icon rendered after the label. */
  trailingIcon?: React.ReactNode;
}

// ─── TabsTrigger ──────────────────────────────────────────────────────────────

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, leadingIcon, trailingIcon, disabled, className, children, ...props }, ref) => {
    const { activeTab, setActiveTab } = useTabsContext();
    const isSelected = activeTab === value;

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        disabled={disabled}
        aria-selected={isSelected}
        aria-controls={`tabpanel-${value}`}
        id={`tab-${value}`}
        onClick={() => !disabled && setActiveTab(value)}
        className={cn(
          // Layout — 40px height, pill shape
          "inline-flex h-10 items-center justify-center gap-2",
          "px-3 rounded-[20px]",
          // Typography
          "text-btn-medium whitespace-nowrap",
          // Transition
          "transition-colors duration-150",
          // Default state — transparent bg, primary text
          "bg-transparent text-action-primary",
          // Hover — only when not selected and not disabled
          !isSelected && !disabled && "hover:bg-primary-50 hover:text-action-primary-hover",
          // Selected state — filled primary bg, white text
          isSelected && "bg-action-primary text-text-white",
          // Focus-visible ring
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2",
          // Disabled state
          disabled && "cursor-not-allowed text-text-disabled opacity-60",
          className,
        )}
        {...props}
      >
        {leadingIcon && (
          <span className="inline-flex shrink-0 items-center justify-center [&>svg]:size-4" aria-hidden>
            {leadingIcon}
          </span>
        )}

        {children}

        {trailingIcon && (
          <span className="inline-flex shrink-0 items-center justify-center [&>svg]:size-4" aria-hidden>
            {trailingIcon}
          </span>
        )}
      </button>
    );
  },
);

TabsTrigger.displayName = "TabsTrigger";

export { TabsTrigger };

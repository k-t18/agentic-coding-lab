"use client";

import * as React from "react";

// ─── Context ──────────────────────────────────────────────────────────────────

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs compound components must be used inside <Tabs>.");
  return ctx;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TabsProps {
  /** The initially active tab value (uncontrolled). */
  defaultValue?: string;
  /** The active tab value (controlled). */
  value?: string;
  /** Fired when the active tab changes. */
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

function Tabs({ defaultValue = "", value, onValueChange, children, className }: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);

  const activeTab = value ?? internalValue;

  const setActiveTab = React.useCallback(
    (next: string) => {
      if (value === undefined) setInternalValue(next);
      onValueChange?.(next);
    },
    [value, onValueChange],
  );

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.displayName = "Tabs";

export { Tabs, useTabsContext };

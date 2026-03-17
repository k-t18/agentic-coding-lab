"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useTabsContext } from "./Tabs";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TabsContentProps {
  /** Must match the `value` of the corresponding <TabsTrigger>. */
  value: string;
  children: React.ReactNode;
  className?: string;
}

// ─── TabsContent ──────────────────────────────────────────────────────────────

function TabsContent({ value, children, className }: TabsContentProps) {
  const { activeTab } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      className={cn("outline-none", className)}
    >
      {children}
    </div>
  );
}

TabsContent.displayName = "TabsContent";

export { TabsContent };

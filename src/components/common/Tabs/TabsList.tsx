import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

// ─── TabsList ─────────────────────────────────────────────────────────────────

function TabsList({ children, className }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn("flex h-10 flex-row items-center", className)}
    >
      {children}
    </div>
  );
}

TabsList.displayName = "TabsList";

export { TabsList };

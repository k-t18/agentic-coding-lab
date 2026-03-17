import { cn } from "@/lib/utils";
import { Button } from "@/components/common/Button";
import type { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SpecialtyListItemProps {
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

// ─── SpecialtyListItem ────────────────────────────────────────────────────────
// Single specialty item in the sidebar built on the shared Button primitive.

export function SpecialtyListItem({ label, icon: Icon, isActive, onClick }: SpecialtyListItemProps) {
  return (
    <Button
      variant="ghost"
      fullWidth
      aria-pressed={isActive}
      onClick={onClick}
      className={cn(
        "justify-start gap-3 px-3 py-2.5 h-auto rounded-md",
        "text-b2",
        isActive
          ? "bg-primary-50 text-action-primary hover:bg-primary-50"
          : "text-text-secondary hover:bg-grey-50 hover:text-text-primary",
      )}
    >
      <span
        className={cn(
          "inline-flex size-8 shrink-0 items-center justify-center rounded-md border",
          isActive
            ? "border-primary-200 bg-white text-action-primary"
            : "border-grey-200 bg-white text-text-secondary",
        )}
        aria-hidden
      >
        <Icon className="size-4" />
      </span>
      <span className="truncate">{label}</span>
    </Button>
  );
}

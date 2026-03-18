import { SpecialtyListItem } from "./SpecialtyListItem";
import type { Specialty } from "../../../app/appointment/data/mockData";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SpecialtySidebarProps {
  specialties: Specialty[];
  selectedSpecialty: string | null;
  onSelect: (id: string) => void;
}

// ─── SpecialtySidebar ─────────────────────────────────────────────────────────
// Left sidebar listing all selectable specialties.

export function SpecialtySidebar({
  specialties,
  selectedSpecialty,
  onSelect,
}: SpecialtySidebarProps) {
  return (
    <aside className="flex w-56 shrink-0 flex-col gap-1 rounded-xl border border-grey-200 bg-white p-2 shadow-100">
      {specialties.map((specialty) => (
        <SpecialtyListItem
          key={specialty.id}
          label={specialty.label}
          icon={specialty.icon}
          isActive={selectedSpecialty === specialty.id}
          onClick={() => onSelect(specialty.id)}
        />
      ))}

      {specialties.length === 0 && (
        <p className="px-3 py-4 text-center text-b2 text-text-disabled">
          No specialties found
        </p>
      )}
    </aside>
  );
}

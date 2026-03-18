"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/common/Input";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AppointmentSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

// ─── AppointmentSearch ────────────────────────────────────────────────────────
// Appointment-scoped search field built on the shared Input primitive.

export function AppointmentSearch({ value, onChange, className }: AppointmentSearchProps) {
  return (
    <Input
      type="text"
      placeholder="Search by Speciality/Doctor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      leadingIcon={<Search />}
      className={className}
    />
  );
}

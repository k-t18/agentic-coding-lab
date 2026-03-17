"use client";

import { useState, useMemo } from "react";
import { AppointmentHeader } from "./components/AppointmentHeader";
import { AppointmentTabs } from "./components/AppointmentTabs";
import { AppointmentSearch } from "./components/AppointmentSearch";
import { SpecialtySidebar } from "./components/SpecialtySidebar";
import { DoctorGrid } from "./components/DoctorGrid";
import { SPECIALTIES, DOCTORS } from "./data/mockData";

// ─── Appointment Page ─────────────────────────────────────────────────────────

export default function AppointmentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);

  // Toggling the same specialty deselects it
  function handleSpecialtySelect(id: string) {
    setSelectedSpecialty((prev) => (prev === id ? null : id));
  }

  // Toggling the same doctor closes the calendar
  function handleDoctorSelect(id: number) {
    setSelectedDoctorId((prev) => (prev === id ? null : id));
  }

  const filteredSpecialties = useMemo(() => {
    if (!searchQuery.trim()) return SPECIALTIES;
    const q = searchQuery.toLowerCase();
    return SPECIALTIES.filter((s) => s.label.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredDoctors = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return DOCTORS.filter((d) => {
      const matchesSpecialty =
        selectedSpecialty === null ||
        d.specialty.toLowerCase() === SPECIALTIES.find((s) => s.id === selectedSpecialty)?.label.toLowerCase();

      const matchesSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q);

      return matchesSpecialty && matchesSearch;
    });
  }, [searchQuery, selectedSpecialty]);

  const newAppointmentContent = (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <AppointmentSearch
        value={searchQuery}
        onChange={setSearchQuery}
        className="max-w-xs"
      />

      {/* Sidebar + Doctor grid */}
      <div className="flex items-start gap-6">
        <SpecialtySidebar
          specialties={filteredSpecialties}
          selectedSpecialty={selectedSpecialty}
          onSelect={handleSpecialtySelect}
        />
        <div className="min-w-0 flex-1">
          <DoctorGrid
            doctors={filteredDoctors}
            selectedDoctorId={selectedDoctorId}
            onDoctorSelect={handleDoctorSelect}
          />
        </div>
      </div>
    </div>
  );

  const patientListContent = (
    <div className="flex items-center justify-center py-16">
      <p className="text-b1 text-text-disabled">Patient list coming soon.</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-white px-6 py-6">
      <div className="mx-auto max-w-screen-xl">
        <AppointmentHeader />
        <div className="mt-6">
          <AppointmentTabs
            newAppointmentContent={newAppointmentContent}
            patientListContent={patientListContent}
          />
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState, useMemo, useEffect } from "react";
import { AppointmentHeader } from "../../components/modules/appointment/AppointmentHeader";
import { AppointmentTabs } from "../../components/modules/appointment/AppointmentTabs";
import { AppointmentSearch } from "../../components/modules/appointment/AppointmentSearch";
import { SpecialtySidebar } from "../../components/modules/appointment/SpecialtySidebar";
import { DoctorGrid } from "../../components/modules/appointment/DoctorGrid";
import useFetchSpecialities from "@/hooks/modules/appointment/useFetchSpecialities";
import useFetchDoctors from "@/hooks/modules/appointment/useFetchDoctors";

// ─── Appointment Page ─────────────────────────────────────────────────────────

export default function AppointmentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  const { data: specialties, isLoading: specialtiesLoading } = useFetchSpecialities();
  const { data: doctors, isLoading: doctorsLoading } = useFetchDoctors(selectedSpecialty ?? "");

  // Auto-select first specialty once loaded
  useEffect(() => {
    if (specialties.length > 0 && selectedSpecialty === null) {
      setSelectedSpecialty(specialties[0].id);
    }
  }, [specialties, selectedSpecialty]);

  // Prevent deselection — only switch if a different specialty is picked
  function handleSpecialtySelect(id: string) {
    if (id !== selectedSpecialty) {
      setSelectedSpecialty(id);
      setSelectedDoctorId(null);
    }
  }

  // Toggling the same doctor closes the calendar
  function handleDoctorSelect(id: string) {
    setSelectedDoctorId((prev) => (prev === id ? null : id));
  }

  const filteredSpecialties = useMemo(() => {
    if (!searchQuery.trim()) return specialties;
    const q = searchQuery.toLowerCase();
    return specialties.filter((s) => s.label.toLowerCase().includes(q));
  }, [searchQuery, specialties]);

  const filteredDoctors = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return doctors;
    return doctors.filter(
      (d) =>
        d.doctor_name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q)
    );
  }, [searchQuery, doctors]);

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
        {specialtiesLoading ? (
          <aside className="flex w-56 shrink-0 items-center justify-center rounded-xl border border-grey-200 bg-white p-4 shadow-100">
            <p className="text-b2 text-text-disabled">Loading…</p>
          </aside>
        ) : (
          <SpecialtySidebar
            specialties={filteredSpecialties}
            selectedSpecialty={selectedSpecialty}
            onSelect={handleSpecialtySelect}
          />
        )}
        <div className="min-w-0 flex-1">
          {doctorsLoading ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-b1 text-text-disabled">Loading doctors…</p>
            </div>
          ) : (
            <DoctorGrid
              doctors={filteredDoctors}
              selectedDoctorId={selectedDoctorId}
              onDoctorSelect={handleDoctorSelect}
            />
          )}
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

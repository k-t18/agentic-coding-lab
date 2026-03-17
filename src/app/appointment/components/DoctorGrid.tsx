import React from "react";
import { DoctorCard } from "./DoctorCard";
import { AppointmentCalendar } from "./AppointmentCalendar";
import type { Doctor } from "../data/mockData";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DoctorGridProps {
  doctors: Doctor[];
  selectedDoctorId: number | null;
  onDoctorSelect: (id: number) => void;
}

const COLS_PER_ROW = 3;

// ─── DoctorGrid ───────────────────────────────────────────────────────────────
// Groups doctors into rows of 3. After the row containing the selected doctor,
// the AppointmentCalendar is injected spanning the full grid width.

export function DoctorGrid({ doctors, selectedDoctorId, onDoctorSelect }: DoctorGridProps) {
  if (doctors.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center py-16">
        <p className="text-b1 text-text-disabled">No doctors found.</p>
      </div>
    );
  }

  // Chunk into rows of COLS_PER_ROW
  const rows: Doctor[][] = [];
  for (let i = 0; i < doctors.length; i += COLS_PER_ROW) {
    rows.push(doctors.slice(i, i + COLS_PER_ROW));
  }

  const selectedDoctor =
    selectedDoctorId !== null
      ? doctors.find((d) => d.id === selectedDoctorId) ?? null
      : null;

  return (
    <div className="flex flex-col gap-4">
      {rows.map((rowDoctors, rowIndex) => {
        const isCalendarRow =
          selectedDoctor !== null &&
          rowDoctors.some((d) => d.id === selectedDoctorId);

        return (
          <React.Fragment key={rowIndex}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {rowDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  isActive={selectedDoctorId === doctor.id}
                  isDisabled={
                    selectedDoctorId !== null && selectedDoctorId !== doctor.id
                  }
                  onBookNow={() => onDoctorSelect(doctor.id)}
                />
              ))}
            </div>

            {/* Calendar opens below the row containing the selected doctor */}
            {isCalendarRow && selectedDoctor && (
              <AppointmentCalendar doctor={selectedDoctor} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

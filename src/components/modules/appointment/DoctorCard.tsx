import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { DoctorCardActions } from "./DoctorCardActions";
import type { Doctor } from "../../../app/appointment/data/mockData";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DoctorCardProps {
  doctor: Doctor;
  isActive?: boolean;
  isDisabled?: boolean;
  onBookNow: () => void;
}

// ─── DoctorCard ───────────────────────────────────────────────────────────────
// Displays a doctor's summary: photo placeholder, name, specialty,
// experience, and action controls.
// Active → highlighted with primary border.
// Disabled → dimmed; Book Now button is non-interactive.

export function DoctorCard({
  doctor,
  isActive = false,
  isDisabled = false,
  onBookNow,
}: DoctorCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border bg-white p-4 shadow-100 transition-all duration-150",
        isActive
          ? "border-action-primary bg-primary-50 shadow-200"
          : "border-grey-200",
        isDisabled && "opacity-50"
      )}
    >
      {/* Doctor info row */}
      <div className="flex items-start gap-3">
        {/* Photo placeholder */}
        <div className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-grey-100 text-grey-400">
          <UserRound className="size-8" aria-hidden />
        </div>

        {/* Info */}
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="truncate text-b1 font-semibold text-text-primary">
            {doctor.doctor_name}
          </p>
          <p className="text-b2 text-text-secondary">{doctor.specialty}</p>
          <p className="text-b2 text-text-secondary">
            Exp: {doctor.experience} years
          </p>
        </div>
      </div>

      {/* Actions */}
      <DoctorCardActions
        isActive={isActive}
        isDisabled={isDisabled}
        onBookNow={onBookNow}
      />
    </div>
  );
}

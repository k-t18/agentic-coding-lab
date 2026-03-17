"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sunrise,
  Sun,
  Sunset,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";
import { MOCK_WEEK_DATA } from "../data/calendarMockData";
import { PatientDetailsModal } from "./PatientDetailsModal";
import type { Doctor } from "../data/mockData";
import type { SlotStatus } from "../data/calendarMockData";
import type { PatientFormData } from "./PatientDetailsModal";

// ─── Constants ────────────────────────────────────────────────────────────────

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMondayOfCurrentWeek(): Date {
  const today = new Date();
  const day = today.getDay(); // 0 = Sun
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function getTodayDayIndex(): number {
  // Returns 0=Mon … 6=Sun
  const day = new Date().getDay();
  return day === 0 ? 6 : day - 1;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface LegendItemProps {
  colorClass: string;
  label: string;
}

function LegendItem({ colorClass, label }: LegendItemProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("size-4 shrink-0 rounded-sm border", colorClass)} aria-hidden />
      <span className="text-b2 text-text-secondary">{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

type DisplayStatus = "available" | "selected" | "blocked" | "booked";

interface TimeSlotButtonProps {
  time: string;
  displayStatus: DisplayStatus;
  onClick: () => void;
}

function TimeSlotButton({ time, displayStatus, onClick }: TimeSlotButtonProps) {
  const isInteractive = displayStatus === "available" || displayStatus === "selected";

  return (
    <Button
      size="small"
      variant={displayStatus === "selected" ? "primary" : "ghost"}
      onClick={isInteractive ? onClick : undefined}
      className={cn(
        "h-9 min-w-[72px] px-4 font-normal text-b2",
        displayStatus === "available" && [
          "border border-grey-200 bg-white text-text-primary",
          "hover:border-primary-300 hover:bg-white",
        ],
        displayStatus === "blocked" && [
          "border border-red-300 bg-red-50 text-red-500 pointer-events-none",
        ],
        displayStatus === "booked" && [
          "border border-grey-200 bg-grey-100 text-text-disabled pointer-events-none",
        ],
      )}
    >
      {time}
    </Button>
  );
}

// ─── AppointmentCalendar ──────────────────────────────────────────────────────

interface AppointmentCalendarProps {
  doctor: Doctor;
}

export function AppointmentCalendar({ doctor: _doctor }: AppointmentCalendarProps) {
  const weekStart = useMemo(() => getMondayOfCurrentWeek(), []);
  const todayIndex = useMemo(() => getTodayDayIndex(), []);

  const [selectedDayIndex, setSelectedDayIndex] = useState(todayIndex);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const weekDays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        return d;
      }),
    [weekStart],
  );

  const monthYear = `${MONTHS[weekDays[0].getMonth()]} ${weekDays[0].getFullYear()}`;

  function handleDaySelect(index: number) {
    setSelectedDayIndex(index);
    setSelectedSlot(null);
  }

  function handleSlotClick(time: string, status: SlotStatus) {
    if (status !== "available") return;
    setSelectedSlot((prev) => (prev === time ? null : time));
  }

  function resolveDisplayStatus(time: string, status: SlotStatus): DisplayStatus {
    if (selectedSlot === time && status === "available") return "selected";
    return status;
  }

  const dayData = MOCK_WEEK_DATA[selectedDayIndex];
  const morningSlots = dayData.slots.filter((s) => s.time < "12:00");
  const afternoonSlots = dayData.slots.filter((s) => s.time >= "12:00" && s.time < "16:00");
  const eveningSlots = dayData.slots.filter((s) => s.time >= "16:00");

  return (
    <div className="rounded-xl border border-grey-200 bg-white p-6 shadow-200">

      {/* ── Week header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1">

        {/* Prev arrow — display only */}
        <Button
          variant="ghost"
          size="small"
          iconOnly
          aria-label="Previous week"
          leadingIcon={<ChevronLeft />}
        />

        {/* Day columns */}
        <div className="flex flex-1 items-center justify-around">
          {DAY_NAMES.map((name, index) => {
            const isSelected = selectedDayIndex === index;
            const dayType = MOCK_WEEK_DATA[index].type;
            const date = weekDays[index].getDate();

            return (
              <Button
                key={name}
                variant="ghost"
                onClick={() => handleDaySelect(index)}
                className={cn(
                  "flex-col h-auto gap-0.5 px-4 py-2 rounded-xl min-w-[64px]",
                  // Selected day — primary blue pill
                  isSelected && "bg-primary-100 text-action-primary hover:bg-primary-100",
                  // Leave day (unselected) — violet pill
                  !isSelected && dayType === "leave" &&
                    "bg-violet-100 text-violet-600 hover:bg-violet-100",
                  // Holiday day (unselected) — orange pill
                  !isSelected && dayType === "holiday" &&
                    "bg-orange-100 text-orange-500 hover:bg-orange-100",
                  // Normal unselected
                  !isSelected && dayType === "normal" && "text-text-secondary",
                )}
              >
                <span className="text-xs font-medium">{name}</span>
                <span
                  className={cn(
                    "text-2xl font-bold leading-none",
                    isSelected && "text-action-primary",
                    !isSelected && dayType === "leave" && "text-violet-600",
                    !isSelected && dayType === "holiday" && "text-orange-500",
                    !isSelected && dayType === "normal" && "text-text-primary",
                  )}
                >
                  {date}
                </span>
              </Button>
            );
          })}
        </div>

        {/* Next arrow — display only */}
        <Button
          variant="ghost"
          size="small"
          iconOnly
          aria-label="Next week"
          leadingIcon={<ChevronRight />}
        />

        {/* Month / year — display only */}
        <div className="ml-3 flex shrink-0 items-center gap-1 rounded-md border border-grey-200 px-3 py-1.5">
          <span className="whitespace-nowrap text-b2 font-medium text-text-primary">
            {monthYear}
          </span>
          <ChevronDown className="size-4 text-text-secondary" aria-hidden />
        </div>
      </div>

      {/* ── Time slot grid ───────────────────────────────────────────────────── */}
      <div className="mt-6 flex flex-col gap-5">

        {morningSlots.length > 0 && (
          <div className="flex items-start gap-4">
            <Sunrise className="mt-2 size-5 shrink-0 text-text-secondary" aria-label="Morning slots" />
            <div className="flex flex-wrap gap-2">
              {morningSlots.map((slot) => (
                <TimeSlotButton
                  key={slot.time}
                  time={slot.time}
                  displayStatus={resolveDisplayStatus(slot.time, slot.status)}
                  onClick={() => handleSlotClick(slot.time, slot.status)}
                />
              ))}
            </div>
          </div>
        )}

        {afternoonSlots.length > 0 && (
          <div className="flex items-start gap-4">
            <Sun className="mt-2 size-5 shrink-0 text-text-secondary" aria-label="Afternoon slots" />
            <div className="flex flex-wrap gap-2">
              {afternoonSlots.map((slot) => (
                <TimeSlotButton
                  key={slot.time}
                  time={slot.time}
                  displayStatus={resolveDisplayStatus(slot.time, slot.status)}
                  onClick={() => handleSlotClick(slot.time, slot.status)}
                />
              ))}
            </div>
          </div>
        )}

        {eveningSlots.length > 0 && (
          <div className="flex items-start gap-4">
            <Sunset className="mt-2 size-5 shrink-0 text-text-secondary" aria-label="Evening slots" />
            <div className="flex flex-wrap gap-2">
              {eveningSlots.map((slot) => (
                <TimeSlotButton
                  key={slot.time}
                  time={slot.time}
                  displayStatus={resolveDisplayStatus(slot.time, slot.status)}
                  onClick={() => handleSlotClick(slot.time, slot.status)}
                />
              ))}
            </div>
          </div>
        )}

        {morningSlots.length === 0 &&
          afternoonSlots.length === 0 &&
          eveningSlots.length === 0 && (
            <p className="py-6 text-center text-b2 text-text-disabled">
              No slots available for this day.
            </p>
          )}
      </div>

      {/* ── Legend + Confirm ─────────────────────────────────────────────────── */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-grey-100 pt-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <LegendItem colorClass="border-grey-300 bg-white" label="Available" />
          <LegendItem colorClass="border-action-primary bg-action-primary" label="Selected" />
          <LegendItem colorClass="border-red-300 bg-red-50" label="Blocked" />
          <LegendItem colorClass="border-violet-300 bg-violet-100" label="Leave" />
          <LegendItem colorClass="border-orange-300 bg-orange-100" label="Holiday" />
          <LegendItem colorClass="border-grey-200 bg-grey-100" label="Booked" />
        </div>

        <Button
          variant="primary"
          size="medium"
          onClick={() => setIsModalOpen(true)}
        >
          Confirm Appointment
        </Button>
      </div>

      {/* Patient Details Modal */}
      <PatientDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data: PatientFormData) => {
          // Booking submission will be handled in the next story
          console.log("Appointment booked:", data);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}

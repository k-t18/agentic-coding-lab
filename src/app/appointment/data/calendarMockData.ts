// ─── Types ────────────────────────────────────────────────────────────────────

export type SlotStatus = "available" | "blocked" | "booked";
export type DayType = "normal" | "leave" | "holiday";

export interface TimeSlot {
  time: string; // "HH:MM" — used for both display and sorting
  status: SlotStatus;
}

export interface DayMockData {
  type: DayType;
  slots: TimeSlot[];
}

// ─── Mock week data (index 0 = Monday … 6 = Sunday) ──────────────────────────

export const MOCK_WEEK_DATA: DayMockData[] = [
  // 0 — Monday (normal)
  {
    type: "normal",
    slots: [
      { time: "08:30", status: "available" },
      { time: "09:00", status: "available" },
      { time: "09:30", status: "available" },
      { time: "09:45", status: "booked" },
      { time: "10:00", status: "available" },
      { time: "10:30", status: "available" },
      { time: "11:00", status: "available" },
      { time: "11:30", status: "booked" },
      { time: "11:45", status: "available" },
      { time: "12:00", status: "available" },
      { time: "12:30", status: "available" },
      { time: "13:20", status: "booked" },
      { time: "13:45", status: "available" },
      { time: "14:00", status: "available" },
      { time: "14:30", status: "available" },
      { time: "15:00", status: "booked" },
      { time: "15:30", status: "available" },
      { time: "15:45", status: "available" },
      { time: "16:00", status: "available" },
      { time: "16:30", status: "available" },
      { time: "17:00", status: "available" },
      { time: "17:45", status: "blocked" },
      { time: "18:30", status: "available" },
      { time: "20:00", status: "available" },
      { time: "21:00", status: "available" },
    ],
  },

  // 1 — Tuesday (normal)
  {
    type: "normal",
    slots: [
      { time: "09:00", status: "available" },
      { time: "09:30", status: "available" },
      { time: "10:00", status: "booked" },
      { time: "10:30", status: "available" },
      { time: "11:00", status: "blocked" },
      { time: "11:30", status: "available" },
      { time: "12:00", status: "available" },
      { time: "12:30", status: "available" },
      { time: "13:00", status: "booked" },
      { time: "14:00", status: "available" },
      { time: "14:30", status: "available" },
      { time: "15:00", status: "available" },
      { time: "15:30", status: "blocked" },
      { time: "16:00", status: "available" },
      { time: "17:00", status: "available" },
      { time: "18:00", status: "booked" },
      { time: "19:30", status: "available" },
      { time: "21:00", status: "available" },
    ],
  },

  // 2 — Wednesday (normal)
  {
    type: "normal",
    slots: [
      { time: "08:00", status: "available" },
      { time: "08:30", status: "booked" },
      { time: "09:00", status: "available" },
      { time: "09:30", status: "available" },
      { time: "10:00", status: "available" },
      { time: "11:00", status: "blocked" },
      { time: "11:30", status: "available" },
      { time: "12:00", status: "booked" },
      { time: "12:30", status: "available" },
      { time: "13:00", status: "available" },
      { time: "14:00", status: "available" },
      { time: "14:30", status: "booked" },
      { time: "15:00", status: "available" },
      { time: "16:00", status: "available" },
      { time: "16:30", status: "available" },
      { time: "17:00", status: "blocked" },
      { time: "18:00", status: "available" },
      { time: "20:00", status: "available" },
    ],
  },

  // 3 — Thursday (leave — limited slots)
  {
    type: "leave",
    slots: [
      { time: "10:00", status: "available" },
      { time: "10:30", status: "available" },
      { time: "11:00", status: "booked" },
      { time: "14:00", status: "available" },
      { time: "14:30", status: "blocked" },
      { time: "15:00", status: "available" },
    ],
  },

  // 4 — Friday (normal)
  {
    type: "normal",
    slots: [
      { time: "08:30", status: "available" },
      { time: "09:00", status: "available" },
      { time: "10:00", status: "booked" },
      { time: "10:30", status: "available" },
      { time: "11:00", status: "available" },
      { time: "11:30", status: "blocked" },
      { time: "12:00", status: "available" },
      { time: "13:00", status: "available" },
      { time: "13:30", status: "booked" },
      { time: "14:00", status: "available" },
      { time: "15:00", status: "available" },
      { time: "15:30", status: "blocked" },
      { time: "16:00", status: "available" },
      { time: "17:30", status: "available" },
      { time: "18:30", status: "booked" },
      { time: "20:00", status: "available" },
    ],
  },

  // 5 — Saturday (holiday — very limited)
  {
    type: "holiday",
    slots: [
      { time: "10:00", status: "available" },
      { time: "10:30", status: "available" },
      { time: "11:00", status: "booked" },
      { time: "12:00", status: "available" },
    ],
  },

  // 6 — Sunday (holiday — emergency only)
  {
    type: "holiday",
    slots: [
      { time: "11:00", status: "available" },
      { time: "14:00", status: "available" },
    ],
  },
];

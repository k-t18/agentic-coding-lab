import {
  Bone,
  Baby,
  Brain,
  Microscope,
  HeartPulse,
  FlaskConical,
  Smile,
  Activity,
  UserRound,
  Eye,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Specialty {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface Doctor {
  id: string;
  doctor_name: string;
  specialty: string;
  experience: number;
}

export const SPECIALTY_ICON_MAP: Record<string, LucideIcon> = {
  orthopedic: Bone,
  gynaecologist: Baby,
  neurologist: Brain,
  oncologist: Microscope,
  cardiologist: HeartPulse,
  pathologist: FlaskConical,
  dentist: Smile,
  psychiatrist: Activity,
  pediatrician: UserRound,
  ophthalmologist: Eye,
};

// ─── Specialties ──────────────────────────────────────────────────────────────

export const SPECIALTIES: Specialty[] = [
  { id: "orthopedic", label: "Orthopedic", icon: Bone },
  { id: "gynaecologist", label: "Gynaecologist", icon: Baby },
  { id: "neurologist", label: "Neurologist", icon: Brain },
  { id: "oncologist", label: "Oncologist", icon: Microscope },
  { id: "cardiologist", label: "Cardiologist", icon: HeartPulse },
  { id: "pathologist", label: "Pathologist", icon: FlaskConical },
  { id: "dentist", label: "Dentist", icon: Smile },
  { id: "psychiatrist", label: "Psychiatrist", icon: Activity },
  { id: "pediatrician", label: "Pediatrician", icon: UserRound },
  { id: "ophthalmologist", label: "Ophthalmologist", icon: Eye },
];

// ─── Doctors ──────────────────────────────────────────────────────────────────

export const DOCTORS: Doctor[] = [
  // Orthopedic
  {
    id: "1",
    doctor_name: "Dr. Jagdish Singh",
    specialty: "Orthopedic",
    experience: 20,
  },
  // Gynaecologist
  {
    id: "12",
    doctor_name: "Dr. Priya Sharma",
    specialty: "Gynaecologist",
    experience: 15,
  },
];

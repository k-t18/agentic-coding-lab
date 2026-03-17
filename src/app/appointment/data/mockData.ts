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
  id: number;
  name: string;
  specialty: string;
  experience: number;
}

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
  { id: 1, name: "Dr. Jagdish Singh", specialty: "Orthopedic", experience: 20 },
  { id: 2, name: "Dr. Sneha Pillai", specialty: "Orthopedic", experience: 20 },
  { id: 3, name: "Dr. Aashna Sinha", specialty: "Orthopedic", experience: 20 },
  { id: 4, name: "Dr. Pallavi Bora", specialty: "Orthopedic", experience: 20 },
  { id: 5, name: "Dr. Suresh Pathak", specialty: "Orthopedic", experience: 20 },
  { id: 6, name: "Dr. Kirti Malhar", specialty: "Orthopedic", experience: 20 },
  { id: 7, name: "Dr. Janardhan Bandi", specialty: "Orthopedic", experience: 20 },
  { id: 8, name: "Dr. Tanmay Deshpande", specialty: "Orthopedic", experience: 20 },
  { id: 9, name: "Dr. Jay Mehta", specialty: "Orthopedic", experience: 20 },
  { id: 10, name: "Dr. Mahesh Ramulu", specialty: "Orthopedic", experience: 20 },
  { id: 11, name: "Dr. Sahil Kapadia", specialty: "Orthopedic", experience: 20 },

  // Gynaecologist
  { id: 12, name: "Dr. Priya Sharma", specialty: "Gynaecologist", experience: 15 },
  { id: 13, name: "Dr. Anita Kapoor", specialty: "Gynaecologist", experience: 18 },
  { id: 14, name: "Dr. Neha Verma", specialty: "Gynaecologist", experience: 12 },
  { id: 15, name: "Dr. Sunita Rao", specialty: "Gynaecologist", experience: 17 },

  // Neurologist
  { id: 16, name: "Dr. Rajesh Kumar", specialty: "Neurologist", experience: 22 },
  { id: 17, name: "Dr. Amit Patel", specialty: "Neurologist", experience: 14 },
  { id: 18, name: "Dr. Divya Menon", specialty: "Neurologist", experience: 19 },
  { id: 19, name: "Dr. Suresh Rajan", specialty: "Neurologist", experience: 16 },

  // Oncologist
  { id: 20, name: "Dr. Vikram Singh", specialty: "Oncologist", experience: 25 },
  { id: 21, name: "Dr. Meera Nair", specialty: "Oncologist", experience: 19 },
  { id: 22, name: "Dr. Suresh Menon", specialty: "Oncologist", experience: 16 },

  // Cardiologist
  { id: 23, name: "Dr. Arjun Mehta", specialty: "Cardiologist", experience: 20 },
  { id: 24, name: "Dr. Kavita Joshi", specialty: "Cardiologist", experience: 15 },
  { id: 25, name: "Dr. Rohit Gupta", specialty: "Cardiologist", experience: 18 },
  { id: 26, name: "Dr. Seema Tiwari", specialty: "Cardiologist", experience: 13 },

  // Pathologist
  { id: 27, name: "Dr. Deepa Iyer", specialty: "Pathologist", experience: 13 },
  { id: 28, name: "Dr. Sanjay Mishra", specialty: "Pathologist", experience: 16 },
  { id: 29, name: "Dr. Pooja Desai", specialty: "Pathologist", experience: 11 },

  // Dentist
  { id: 30, name: "Dr. Rahul Jain", specialty: "Dentist", experience: 10 },
  { id: 31, name: "Dr. Asha Bhatt", specialty: "Dentist", experience: 14 },
  { id: 32, name: "Dr. Kiran Chandra", specialty: "Dentist", experience: 12 },

  // Psychiatrist
  { id: 33, name: "Dr. Manish Trivedi", specialty: "Psychiatrist", experience: 18 },
  { id: 34, name: "Dr. Shweta Agarwal", specialty: "Psychiatrist", experience: 15 },
  { id: 35, name: "Dr. Nikhil Saxena", specialty: "Psychiatrist", experience: 20 },

  // Pediatrician
  { id: 36, name: "Dr. Geeta Reddy", specialty: "Pediatrician", experience: 17 },
  { id: 37, name: "Dr. Vinod Shah", specialty: "Pediatrician", experience: 13 },
  { id: 38, name: "Dr. Lakshmi Pillai", specialty: "Pediatrician", experience: 16 },

  // Ophthalmologist
  { id: 39, name: "Dr. Anil Bose", specialty: "Ophthalmologist", experience: 21 },
  { id: 40, name: "Dr. Ritu Khanna", specialty: "Ophthalmologist", experience: 14 },
  { id: 41, name: "Dr. Pratik Doshi", specialty: "Ophthalmologist", experience: 18 },
];

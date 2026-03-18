"use client";

import { useState, useEffect } from "react";
import { X, Search, ChevronDown, Accessibility } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Radio } from "@/components/common/Radio";
import { RadioGroup } from "@/components/common/Radio";

// ─── Types ────────────────────────────────────────────────────────────────────

type AppointmentStatus = "tentative" | "confirmed";

export interface PatientFormData {
  name: string;
  phone: string;
  email: string;
  appointmentStatus: AppointmentStatus;
  remarks: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

export interface PatientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PatientFormData) => void;
}

// ─── PatientDetailsModal ──────────────────────────────────────────────────────
// Modal form for capturing patient details before confirming an appointment.
// Triggered by the "Confirm Appointment" button in AppointmentCalendar.
// Name, phone, and email are mandatory with inline validation.

export function PatientDetailsModal({
  isOpen,
  onClose,
  onSave,
}: PatientDetailsModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [appointmentStatus, setAppointmentStatus] =
    useState<AppointmentStatus>("tentative");
  const [remarks, setRemarks] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  // Reset form each time the modal opens fresh
  useEffect(() => {
    if (isOpen) {
      setName("");
      setPhone("");
      setEmail("");
      setAppointmentStatus("tentative");
      setRemarks("");
      setErrors({});
    }
  }, [isOpen]);

  // Lock body scroll while modal is mounted
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Validation ─────────────────────────────────────────────────────────────

  function validate(): boolean {
    const next: FormErrors = {};

    if (!name.trim()) {
      next.name = "Patient name is required";
    }

    if (!phone.trim()) {
      next.phone = "Phone number is required";
    } else if (!/^\d{7,15}$/.test(phone.trim())) {
      next.phone = "Enter a valid phone number (digits only, 7–15 chars)";
    }

    if (!email.trim()) {
      next.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Enter a valid email address";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  // ── Handlers ───────────────────────────────────────────────────────────────

  function handleSave() {
    if (!validate()) return;
    onSave({ name, phone, email, appointmentStatus, remarks });
  }

  function handleCancel() {
    onClose();
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) handleCancel();
  }

  if (!isOpen) return null;

  return (
    // ── Backdrop ─────────────────────────────────────────────────────────────
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-grey-900/50 px-4"
      onClick={handleBackdropClick}
    >
      {/* ── Modal container ─────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="patient-modal-title"
        className="w-full max-w-2xl rounded-2xl bg-white shadow-800"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-grey-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <Accessibility className="size-5 text-action-primary" aria-hidden />
            <h2
              id="patient-modal-title"
              className="text-h5 font-semibold text-text-primary"
            >
              Patient Details
            </h2>
          </div>
          <Button
            variant="ghost"
            size="small"
            iconOnly
            aria-label="Close modal"
            leadingIcon={<X />}
            onClick={handleCancel}
          />
        </div>

        {/* Form body */}
        <div className="flex flex-col gap-5 px-6 py-5">
          {/* Patient ID & Name */}
          <div className="w-1/3">
            <Input
              label="Patient ID & Name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leadingIcon={<Search />}
              status={errors.name ? "error" : "default"}
              helperText={errors.name}
            />
          </div>

          {/* Mobile No. | Email ID | Appointment Status */}
          <div className="grid grid-cols-3 items-start gap-4">
            {/* Mobile No. */}
            <div className="flex flex-col gap-2">
              <span className="text-b2 text-text-primary">Mobile No.</span>
              <div className="flex items-start gap-2">
                {/* Country code — display only */}
                <Button
                  variant="primary"
                  size="medium"
                  trailingIcon={<ChevronDown />}
                  className="shrink-0"
                >
                  + 91
                </Button>
                <Input
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  status={errors.phone ? "error" : "default"}
                  helperText={errors.phone}
                />
              </div>
            </div>

            {/* Email ID */}
            <Input
              label="Email ID"
              placeholder="Email ID"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              status={errors.email ? "error" : "default"}
              helperText={errors.email}
            />

            {/* Appointment Status */}
            <RadioGroup label="Appointment Status" orientation="horizontal">
              <Radio
                name="appointmentStatus"
                value="tentative"
                label="Tentative"
                checked={appointmentStatus === "tentative"}
                onChange={() => setAppointmentStatus("tentative")}
              />
              <Radio
                name="appointmentStatus"
                value="confirmed"
                label="Confirmed"
                checked={appointmentStatus === "confirmed"}
                onChange={() => setAppointmentStatus("confirmed")}
              />
            </RadioGroup>
          </div>

          {/* Remarks */}
          <div className="w-1/3">
            <Input
              label="Remarks"
              placeholder="Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-grey-100 px-6 py-4">
          <Button variant="outline" size="medium" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" size="medium" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

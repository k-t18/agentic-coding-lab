// ─── AppointmentHeader ────────────────────────────────────────────────────────
// Appointment-scoped page header with title and divider.

export function AppointmentHeader() {
  return (
    <div>
      <h1 className="text-h4 font-semibold text-text-primary">
        Appointment Scheduling
      </h1>
      <hr className="mt-4 border-grey-200" />
    </div>
  );
}

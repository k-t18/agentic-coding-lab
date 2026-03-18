import { Mail, Phone, MessageCircle, CalendarDays } from "lucide-react";
import { Button } from "@/components/common/Button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DoctorCardActionsProps {
  isActive: boolean;
  isDisabled: boolean;
  onBookNow: () => void;
}

// ─── DoctorCardActions ────────────────────────────────────────────────────────
// Action row: contact icon buttons + Book Now CTA.
// Book Now toggles the appointment calendar.

export function DoctorCardActions({
  isActive,
  isDisabled,
  onBookNow,
}: DoctorCardActionsProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      {/* Contact icon buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="small"
          iconOnly
          aria-label="Send email"
          leadingIcon={<Mail />}
        />
        <Button
          variant="outline"
          size="small"
          iconOnly
          aria-label="Call doctor"
          leadingIcon={<Phone />}
        />
        <Button
          variant="outline"
          size="small"
          iconOnly
          aria-label="WhatsApp"
          leadingIcon={<MessageCircle />}
        />
      </div>

      {/* Book Now — disabled on inactive cards; active label changes when calendar is open */}
      <Button
        variant="primary"
        size="small"
        disabled={isDisabled}
        onClick={onBookNow}
        leadingIcon={<CalendarDays />}
      >
        {isActive ? "Close" : "Book Now"}
      </Button>
    </div>
  );
}

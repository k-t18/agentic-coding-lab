import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/common/Tabs";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AppointmentTabsProps {
  newAppointmentContent: React.ReactNode;
  patientListContent: React.ReactNode;
}

// ─── AppointmentTabs ──────────────────────────────────────────────────────────
// Appointment-scoped tab shell built on the shared Tabs primitive.
// Defines the two fixed appointment tabs with their content slots.

export function AppointmentTabs({ newAppointmentContent, patientListContent }: AppointmentTabsProps) {
  return (
    <Tabs defaultValue="new-appointment">
      <TabsList className="gap-1">
        <TabsTrigger value="new-appointment">New Appointment</TabsTrigger>
        <TabsTrigger value="patient-lists">Patient Lists</TabsTrigger>
      </TabsList>

      <TabsContent value="new-appointment" className="mt-4">
        {newAppointmentContent}
      </TabsContent>

      <TabsContent value="patient-lists" className="mt-4">
        {patientListContent}
      </TabsContent>
    </Tabs>
  );
}

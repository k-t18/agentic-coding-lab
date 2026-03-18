import toast from "react-hot-toast";
import { useApiMutation } from "@/lib/api-hooks";

interface AppointmentBookingPayload {
  patient_name: string;
  mobile_number: string;
  doctor_id: string;
  timing: string;
}

const useCreateAppointment = () => {
  return useApiMutation<unknown, AppointmentBookingPayload>(
    "/api/resource/Appointment%20Booking",
    {
      mutationOptions: {
        onSuccess: () => {
          toast.success("Appointment booked successfully!");
        },
        onError: () => {
          toast.error("Failed to book appointment. Please try again.");
        },
      },
    },
  );
};

export default useCreateAppointment;

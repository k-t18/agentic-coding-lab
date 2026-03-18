import { useApiQuery } from "@/lib/api-hooks";
import type { Doctor } from "@/app/appointment/data/mockData";

interface FrappeDoctorResponse {
  data: {
    name: string;
    doctor_name: string;
    specialty: string;
    experience: number;
  }[];
}

const useFetchDoctors = (selectedSpecialty: string) => {
  const { data, isLoading, error } = useApiQuery<FrappeDoctorResponse>(
    ["doctors", selectedSpecialty],
    "/api/resource/Doctors",
    {
      params: {
        fields: '["name","doctor_name","specialty","experience"]',
        filters: `[["specialty","=","${selectedSpecialty}"]]`,
      },
    },
    { enabled: !!selectedSpecialty, staleTime: 5 * 60 * 1000 }
  );

  const doctors: Doctor[] =
    data?.data.map((d) => ({
      id: d.name,
      doctor_name: d.doctor_name,
      specialty: d.specialty,
      experience: d.experience,
    })) ?? [];

  return { data: doctors, isLoading, error };
};

export default useFetchDoctors;

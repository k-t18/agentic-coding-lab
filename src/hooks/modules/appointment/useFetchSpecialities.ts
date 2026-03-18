import { useApiQuery } from "@/lib/api-hooks";
import { Activity } from "lucide-react";
import {
  SPECIALTY_ICON_MAP,
  type Specialty,
} from "@/app/appointment/data/mockData";

interface FrappeSpecialtyResponse {
  data: { name: string; specialty_name: string }[];
}

const useFetchSpecialities = () => {
  const { data, isLoading, error } = useApiQuery<FrappeSpecialtyResponse>(
    ["specialities"],
    "/api/resource/Specialty",
    { params: { fields: '["name","specialty_name"]' } }
  );

  const specialties: Specialty[] =
    data?.data.map((s) => ({
      id: s.name,
      label: s.specialty_name,
      icon: SPECIALTY_ICON_MAP[s.specialty_name.toLowerCase()] ?? Activity,
    })) ?? [];

  return { data: specialties, isLoading, error };
};

export default useFetchSpecialities;

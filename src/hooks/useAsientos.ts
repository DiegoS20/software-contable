import { useQuery } from "@tanstack/react-query";
import { Asiento, AsientoTable } from "@/types";

const API_URL = "/api/asientos" as const;

export const fetchAsientos = () => fetch(API_URL).then((res) => res.json());

export default function useAsientos() {
  const { data, isLoading, refetch } = useQuery<AsientoTable[]>({
    queryKey: ["asientos"],
    queryFn: fetchAsientos,
  });

  const createAsiento = async (asiento: Asiento) => {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(asiento),
    });
  };

  return {
    asientos: data,
    asientosLoading: isLoading,
    reloadAsientos: refetch,
    createAsiento,
  };
}

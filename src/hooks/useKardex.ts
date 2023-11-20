import { useQuery } from "@tanstack/react-query";
import { Kardex } from "@/types";

export const fetchKardex = () => fetch("/api/kardex").then((res) => res.json());

export default function useKardex() {
  const { data, isLoading, refetch } = useQuery<Kardex[]>({
    queryKey: ["kardex"],
    queryFn: fetchKardex,
  });

  return {
    kardex: data,
    kardexLoading: isLoading,
    reloadKardex: refetch,
  };
}

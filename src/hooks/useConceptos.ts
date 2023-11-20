import { useQuery } from "@tanstack/react-query";
import { ConceptoTable } from "@/types";

export const fetchConceptos = () =>
  fetch("/api/conceptos").then((res) => res.json());

export default function useConceptos() {
  const { isLoading, data, refetch } = useQuery<Conceptos[]>({
    queryKey: ["conceptos"],
    queryFn: fetchConceptos,
  });

  return {
    conceptosLoading: isLoading,
    conceptos: data,
    reloadConceptos: refetch,
  };
}

type Conceptos = {
  code: string;
  name: string;
  Conceptos: {
    id_concepto: number;
    code: string;
    name: string;
    categoria: ConceptoTable;
  }[];
};

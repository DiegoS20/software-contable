import { useQuery } from "@tanstack/react-query";

export const fetchEstadosFinancieros = () =>
  fetch("/api/estados-financieros").then((res) => res.json());

export default function useEstadosFinancieros() {
  const { data, isLoading, refetch } = useQuery<Response>({
    queryKey: ["estados-financieros"],
    queryFn: fetchEstadosFinancieros,
  });

  return {
    estadosFinancieros: data,
    isLoading,
    refetch,
  };
}

type Response = {
  balanceGeneral: {
    [k: string]: {
      id_concepto: number;
      code_categoria: string;
      total_debe: string;
      total_haber: string;
      saldo: string;
    };
  };
  estadoDeResultado: {
    [k: string]: number;
  };
};

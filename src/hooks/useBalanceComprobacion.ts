import { BalanceComprobacion } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const fetchBalanceComprobacion = () =>
  fetch("/api/balance-comprobacion").then((res) => res.json());

export default function useBalanceComprobacion() {
  const { isLoading, data, refetch } = useQuery<Response>({
    queryKey: ["balance-comprobacion"],
    queryFn: fetchBalanceComprobacion,
  });

  return {
    balanceComprobacion: data,
    balanceComprobacionLoading: isLoading,
    recalculateBalanceComprobacion: refetch,
  };
}

type Response = {
  balances: BalanceComprobacion[];
  totals: {
    total_debe: number;
    total_haber: number;
    total_deudor: number;
    total_acreedor: number;
  };
};

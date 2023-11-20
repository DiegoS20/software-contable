"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";

const qc = new QueryClient();

export default function ReactQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={qc}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

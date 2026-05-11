"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MirageProvider } from "@/contexts/MirageContext";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MirageProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MirageProvider>
  );
}
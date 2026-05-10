"use client";

import { Poppins, Outfit, DM_Sans } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MirageProvider } from "@/contexts/MirageContext";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--poppins",
  subsets: ["devanagari"],
});

const outfit = Outfit({
  variable: "--outfit",
  subsets: ["latin"],
});

const dm_sans = DM_Sans({
  variable: "--dm_sans",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" className={`${poppins.variable} ${dm_sans.variable} ${outfit.variable}`}>
      <body className={`${poppins.variable} ${dm_sans.variable} ${outfit.variable}`}>
        <MirageProvider>                            
          <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
              {children}
            </ChakraProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </MirageProvider>
      </body>
    </html>
  );
}
"use client"

import type { Metadata } from "next";
import { Poppins, Outfit, DM_Sans } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";
import { makeServer } from "@/services/mirage/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

// export const metadata: Metadata = {
//   title: "Baza",
//   description: "Baza | Delivery App",
// };

if(process.env.NODE_ENV === "development"){
  makeServer();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <QueryClientProvider client={new QueryClient}>
        <ChakraProvider theme={theme}>
          <html lang="pt" className={`${poppins.variable} ${dm_sans.variable} ${outfit.variable}`}>
            <body className={`${poppins.variable} ${dm_sans.variable} ${outfit.variable}`}>{children}</body>
          </html>
      </ChakraProvider>
      </QueryClientProvider>
  );
}

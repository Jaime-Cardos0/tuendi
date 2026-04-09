import type { Metadata } from "next";
import { Poppins, Outfit, DM_Sans } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["devanagari"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const dm_sans = DM_Sans({
  variable: "--font-dm_sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tuendi",
  description: "Baza | Delivery App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChakraProvider theme={theme}>
      <html lang="pt" className={`${poppins.variable} ${dm_sans.variable} ${outfit.variable}`}>
        <body>{children}</body>
      </html>
    </ChakraProvider>
  );
}

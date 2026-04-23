"use client";

import { useEffect } from "react";
import { makeServer } from "@/services/mirage/server"; // caminho para o seu arquivo do mirage

export function MirageProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // O useEffect garante que isso rode apenas no navegador
    if (process.env.NODE_ENV === "development") {
      makeServer();
    }
  }, []);

  return <>{children}</>;
}
"use client";
import { api } from "@/services/api";
import { ISubscricao } from "@/services/mirage/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";

interface EarningsContextData {
  subscricoes: ISubscricao[];
  receitaTotal: number;
  receitaSemanal: number;
  receitaMensal: number;
  activasCount: number;
  receitaPorMes: number[];
  isFetching: boolean;
}

interface EarningsProviderProps {
  children: ReactNode;
}

export const EarningsContext = createContext<EarningsContextData>({} as EarningsContextData);

export function EarningsProvider({ children }: EarningsProviderProps) {

  const { data, isFetching } = useQuery<ISubscricao[]>({ queryKey: ['earningsQuery'], queryFn: async () => {
    const res = await api.get("/subscricoes");
    return res.data;
  }});

  function gerarReceitaMensal(subs: ISubscricao[]): number[] {
    const meses = Array.from({ length: 12 }, (_, i) => ({
      mes: i,
      total: 0,
    }));

    subs.forEach((s) => {
      const mes = new Date(s.criadoEm).getMonth();
      meses[mes].total += s.valor;
    });

    return meses.map((m) => m.total);
  }

  const receitaTotal = ( data || []).reduce((acc, s) => acc + s.valor, 0);
  const receitaSemanal = ( data || [])
    .filter((s) => s.plano === "semanal")
    .reduce((acc, s) => acc + s.valor, 0);
  const receitaMensal = ( data || [])
    .filter((s) => s.plano === "mensal")
    .reduce((acc, s) => acc + s.valor, 0);
  const activasCount = ( data || []).filter((s) => s.status === "activa").length;
  const receitaPorMes = gerarReceitaMensal(data || []);

  return (
    <EarningsContext.Provider
      value={{
        subscricoes: data || [],
        receitaTotal,
        receitaSemanal,
        receitaMensal,
        activasCount,
        receitaPorMes,
        isFetching,
      }}
    >
      {children}
    </EarningsContext.Provider>
  );
}

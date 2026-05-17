"use client";
import { api } from "@/services/api";
import { ISubscricao } from "@/services/mirage/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, SetStateAction, useEffect, useState } from "react";
import { isDevelopment, sampleSubscricoes } from "./DashboardContext";

interface EarningsContextData {
  subscricoes: ISubscricao[];
  receitaTotal: number;
  receitaSemanal: number;
  receitaMensal: number;
  activasCount: number;
  receitaPorMes: number[];
  isFetching: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  isLoading: boolean;
}

interface EarningsProviderProps {
  children: ReactNode;
}

export const EarningsContext = createContext<EarningsContextData>({} as EarningsContextData);

export function EarningsProvider({ children }: EarningsProviderProps) {

  const [page, setPage] = useState(1);
  
  const { data, refetch, isFetching, isLoading } = useQuery( {queryKey: ['EarningsQuery', page], queryFn: async () => {
    const { data, headers}: { data: ISubscricao[]; headers: Record<string, string> } = await api.get("/subscricoes", { params: { page: page, perPage: 10 } });

    const total = JSON.parse(headers['x-total-count'] ?? '0');

    return {data, total};
  }});

  const earningsData = isDevelopment ? data?.data ?? [] : sampleSubscricoes;

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

  const receitaTotal = ( earningsData || []).reduce((acc, s) => acc + s.valor, 0);
  const receitaSemanal = ( earningsData || [])
    .filter((s) => s.plano === "semanal")
    .reduce((acc, s) => acc + s.valor, 0);
  const receitaMensal = ( earningsData || [])
    .filter((s) => s.plano === "mensal")
    .reduce((acc, s) => acc + s.valor, 0);
  const activasCount = ( earningsData || []).filter((s) => s.status === "activa").length;
  const receitaPorMes = gerarReceitaMensal(earningsData || []);

  return (
    <EarningsContext.Provider
      value={{
        subscricoes: earningsData || [],
        receitaTotal,
        receitaSemanal,
        receitaMensal,
        activasCount,
        receitaPorMes,
        isFetching,
        page,
        setPage,
        total: data?.total,
        isLoading,
      }}
    >
      {children}
    </EarningsContext.Provider>
  );
}

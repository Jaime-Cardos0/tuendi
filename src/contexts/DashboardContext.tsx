//DashboardContext.tsx

"use client";
import { api } from "@/services/api";
import { IPedido, IMotoqueiro, IUser, ISubscricao, ISuporte } from "@/services/mirage/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useState } from "react";
import { samplePedidos, sampleMotoqueiros, sampleClientes, sampleSubscricoes, isDevelopment } from "./StacticData";
import { DeliveriesQueryResult } from "./DeliveriesContext";

interface DashboardContextData {
  pedidos: IPedido[];
  motoqueiros: IMotoqueiro[];
  clientes: IUser[];
  suportes: ISuporte[];
  totalPedidos: number;
  totalReceita: number;
  totalMotoqueiros: number;
  totalUsuarios: number;
  pedidosRecentes: IPedido[];
  motoqueirosPendentes: IMotoqueiro[];
  ticketsAbertos: ISuporte[];
  isFetching: boolean;
  isLoading: boolean;
  receitaPorMes: (pedidos: IPedido[]) => number[];
  entregasPorMes: (pedidos: IPedido[]) => number[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardContext = createContext<DashboardContextData>({} as DashboardContextData);

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [page, setPage] = useState(1);

  const pedidosQuery = useQuery<DeliveriesQueryResult>({ queryKey: ['deliveries', page], queryFn: async () => {
      try{
        const {data, headers}: { data: IPedido[]; headers: Record<string, string> } = await api.get("/pedidos", {
          params: {page: page, perPage: 10}
        });
        const {total, emTransito, entregues, cancelados} = JSON.parse(headers['x-total-count'] || '{}');
        return { data, filteredData: {total, emTransito, entregues, cancelados} };
      }
      catch(err) {
        console.error("Error fetching deliveries:", err);
        throw err;
      }
    }, enabled: isDevelopment, retry: false});
  

  const motoqueirosQuery = useQuery<IMotoqueiro[]>({
    queryKey: ["motoqueirosQuery"],
    queryFn: async () => (await api.get("/motoqueiros")).data,
    enabled: isDevelopment, retry: false,
  });

  const usuariosQuery = useQuery<IUser[]>({
    queryKey: ["usuariosQuery"],
    queryFn: async () => (await api.get("/users")).data,
    enabled: isDevelopment, retry: false,
  });

  const subscricoesQuery = useQuery<ISubscricao[]>({
    queryKey: ["subscricoesQuery"],
    queryFn: async () => (await api.get("/subscricoes")).data,
    enabled: isDevelopment, retry: false,
  });

  const suportesQuery = useQuery<ISuporte[]>({
    queryKey: ["suportesQuery"],
    queryFn: async () => (await api.get("/suportes")).data,
    enabled: isDevelopment, retry: false,
  });

  const pedidosData = pedidosQuery?.data?.data ?? [];
  const motoqueirosData  = isDevelopment ? motoqueirosQuery.data  ?? [] : sampleMotoqueiros;
  const usuariosData     = isDevelopment ? usuariosQuery.data     ?? [] : sampleClientes;
  const subscricoesData  = isDevelopment ? subscricoesQuery.data  ?? [] : sampleSubscricoes;
  const suportesData     = isDevelopment ? suportesQuery.data     ?? [] : [];

  const totalReceita = subscricoesData.reduce((acc, s) => acc + s.valor, 0);

  const pedidosRecentes = [...pedidosData]
    .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime())
    .slice(0, 8);

  const motoqueirosPendentes = motoqueirosData
    .filter((m) => m.status === "pendente_aprovacao")
    .slice(0, 5);

  const ticketsAbertos = suportesData
    .filter((s) => s.status === "aberto")
    .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime())
    .slice(0, 5);

  function receitaPorMes(pedidos: IPedido[]) {
    const totais = Array(12).fill(0);
    pedidos?.filter((p) => p.status === "entregue").forEach((p) => {
      totais[new Date(p.criadoEm).getMonth()] += p.valorEntrega;
    });
    return totais;
  }

  function entregasPorMes(pedidos: IPedido[]) {
    const totais = Array(12).fill(0);
    pedidos?.filter((p) => p.status === "entregue").forEach((p) => {
      totais[new Date(p.criadoEm).getMonth()] += 1;
    });
    return totais;
  }

  return (
    <DashboardContext.Provider value={{
      pedidos:             pedidosData,
      motoqueiros:         motoqueirosData,
      clientes:            usuariosData,
      suportes:            suportesData,
      totalPedidos:        pedidosData.length,
      totalReceita,
      totalMotoqueiros:    motoqueirosData.length,
      totalUsuarios:       usuariosData.length,
      pedidosRecentes,
      motoqueirosPendentes,
      ticketsAbertos,
      isFetching: pedidosQuery.isFetching || motoqueirosQuery.isFetching || usuariosQuery.isFetching || subscricoesQuery.isFetching,
      isLoading:  pedidosQuery.isLoading  || motoqueirosQuery.isLoading  || usuariosQuery.isLoading  || subscricoesQuery.isLoading,
      receitaPorMes,
      entregasPorMes,
      page,
      setPage,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}
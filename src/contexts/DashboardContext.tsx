"use client";
import { api } from "@/services/api";
import { IPedido, IMotoqueiro, IUser, ISubscricao } from "@/services/mirage/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";

interface DashboardContextData {
  pedidos: IPedido[];
  totalPedidos: number;
  totalReceita: number;
  totalMotoqueiros: number;
  totalUsuarios: number;
  pedidosRecentes: IPedido[];
  isFetching: boolean;
  receitaPorMes: (pedidos: IPedido[]) => number[];
  entregasPorMes: (pedidos: IPedido[]) => number[];
  motoqueiros: IMotoqueiro[];
  clientes: IUser[];
}

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardContext = createContext<DashboardContextData>({} as DashboardContextData);

export function DashboardProvider({ children }: DashboardProviderProps) {
  // const [pedidos, setPedidos] = useState<IPedido[]>([]);
  // const [motoqueiros, setMotoqueiros] = useState<IMotoqueiro[]>([]);
  // const [usuarios, setUsuarios] = useState<IUser[]>([]);
  // const [subscricoes, setSubscricoes] = useState<ISubscricao[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const [pedidosRes, motoqueirosRes, usuariosRes, subscricoesRes] = await Promise.all([
  //         api.get("/pedidos"),
  //         api.get("/motoqueiros"),
  //         api.get("/users"),
  //         api.get("/subscricoes"),
  //       ]);
  //       setPedidos(pedidosRes.data);
  //       setMotoqueiros(motoqueirosRes.data);
  //       setUsuarios(usuariosRes.data);
  //       setSubscricoes(subscricoesRes.data);
  //     } catch (err) {
  //       console.error("Error fetching dashboard data:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const pedidosQuery = useQuery<IPedido[]>({ queryKey: ['pedidosQuery'], queryFn: async () => {
    const res = await api.get("/pedidos");
    return res.data;
  }});

  const motoqueirosQuery = useQuery<IMotoqueiro[]>({ queryKey: ['motoqueirosQuery'], queryFn: async () => {
    const res = await api.get("/motoqueiros");
    return res.data;
  }});

  const usuariosQuery = useQuery<IUser[]>({ queryKey: ['usuariosQuery'], queryFn: async () => {
    const res = await api.get("/users");
    return res.data;
  }});

  const subscricoesQuery = useQuery<ISubscricao[]>({ queryKey: ['subscricoesQuery'], queryFn: async () => {
    const res = await api.get("/subscricoes");
    return res.data;
  }});

  const totalReceita = (subscricoesQuery.data ?? []).reduce((acc, s) => acc + s.valor, 0);
  const pedidosRecentes = [...(pedidosQuery.data ?? [])].sort((a, b) => 
    new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
  ).slice(0, 10);

  function receitaPorMes(pedidos: IPedido[]) {
    const totais = Array(12).fill(0);
    pedidos
      .filter((p) => p.status === "entregue")
      .forEach((p) => {
        const mes = new Date(p.criadoEm).getMonth();
        totais[mes] += p.valorEntrega;
      });
    return totais;
  }
  
  function entregasPorMes(pedidos: IPedido[]) {
    const totais = Array(12).fill(0);
    pedidos
      .filter((p) => p.status === "entregue")
      .forEach((p) => {
        const mes = new Date(p.criadoEm).getMonth();
        totais[mes] += 1;
      });
    return totais;
  }

  return (
    <DashboardContext.Provider
      value={{
        pedidos: pedidosQuery.data ?? [],
        motoqueiros: motoqueirosQuery.data ?? [],
        clientes: usuariosQuery.data ?? [],
        totalPedidos: (pedidosQuery.data ?? []).length,
        totalReceita,
        totalMotoqueiros: (motoqueirosQuery.data ?? []).length,
        totalUsuarios: (usuariosQuery.data ?? []).length,
        pedidosRecentes,
        isFetching: pedidosQuery.isFetching ?? motoqueirosQuery.isFetching ?? usuariosQuery.isFetching ?? subscricoesQuery.isFetching,
        receitaPorMes: (pedidos) => receitaPorMes(pedidos),
        entregasPorMes: (pedidos) => entregasPorMes(pedidos),
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

"use client";
import { api } from "@/services/api";
import { IPedido, PedidoStatus } from "@/services/mirage/types";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";
import { isDevelopment, samplePedidos } from "./DashboardContext";

interface DeliveriesContextData {
  pedidos: IPedido[];
  total: number;
  emTransito: number;
  entregues: number;
  cancelados: number;
  updateStatus: UseMutationResult<void, Error, { id: string; status: PedidoStatus }, unknown>["mutate"];
  getDeliveriesByStatus: (status: PedidoStatus) => IPedido[];
  isFetching: boolean;
  isLoading: boolean;
  cancelarPedido: UseMutationResult<void, Error, string, unknown>["mutate"];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface DeliveriesQueryResult {
  data: IPedido[];
  filteredData: {
    total: number;
    emTransito: number;
    entregues: number;
    cancelados: number;
  };
}

interface DeliveriesProviderProps {
  children: ReactNode;
}

export const DeliveriesContext = createContext<DeliveriesContextData>({} as DeliveriesContextData);

export function DeliveriesProvider({ children }: DeliveriesProviderProps) {

  const [page, setPage] = useState(1);

  const { data, isFetching, error, refetch, isLoading } = useQuery<DeliveriesQueryResult>({ queryKey: ['deliveriesQuery', page], queryFn: async () => {
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
  }});

  const deliveryData = isDevelopment ? data?.data ?? [] : samplePedidos;

  const deliveryDataTotal = isDevelopment ? data?.filteredData.total ?? 0 : samplePedidos.length; 

  const updateStatus = useMutation({ mutationFn: async ({ id, status }: { id: string; status: PedidoStatus }) => {
    try {
      await api.patch(`/pedidos/${id}`, { status });
      refetch();
    } catch (err) {
      console.error("Error updating delivery status:", err);
      throw err;
    }
  }});

  const cancelarPedido = useMutation({ mutationFn: async (id: string) => {
    try {
      await api.patch(`/pedidos/${id}`, { status: "cancelado" });
      refetch();
    } catch (err) {
      console.error("Error canceling delivery:", err);
      throw err;
    }
  }});

  function getDeliveriesByStatus(status: PedidoStatus) {
    return (deliveryData || []).filter((d) => d.status === status);
  }

  return (
    <DeliveriesContext.Provider
      value={{
        page,
        setPage,
        pedidos: deliveryData || [],
        total: deliveryDataTotal || 0,
        emTransito: data?.filteredData.emTransito || 0,
        entregues: data?.filteredData.entregues || 0,
        cancelados: data?.filteredData.cancelados || 0,
        updateStatus: updateStatus.mutate,
        cancelarPedido: cancelarPedido.mutate,
        getDeliveriesByStatus,
        isFetching,
        isLoading
      }}
    >
      {children}
    </DeliveriesContext.Provider>
  );
}

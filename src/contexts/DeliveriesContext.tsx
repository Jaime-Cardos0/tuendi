"use client";
import { api } from "@/services/api";
import { IPedido, PedidoStatus } from "@/services/mirage/types";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";

interface DeliveriesContextData {
  pedidos: IPedido[];
  total: number;
  emTransito: number;
  entregues: number;
  cancelados: number;
  updateStatus: UseMutationResult<void, Error, { id: string; status: PedidoStatus }, unknown>["mutate"];
  getDeliveriesByStatus: (status: PedidoStatus) => IPedido[];
  isFetching: boolean;
  cancelarPedido: UseMutationResult<void, Error, string, unknown>["mutate"];
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

  const { data, isFetching, error, refetch } = useQuery<DeliveriesQueryResult>({ queryKey: ['deliveriesQuery'], queryFn: async () => {
    try{
      const {data, headers}: { data: IPedido[]; headers: Record<string, string> } = await api.get("/pedidos");
      const {total, emTransito, entregues, cancelados} = JSON.parse(headers['x-total-count'] || '{}');
      return { data, filteredData: {total, emTransito, entregues, cancelados} };
    }
    catch(err) {
      console.error("Error fetching deliveries:", err);
      throw err;
    }

  }});

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
    return (data?.data || []).filter((d) => d.status === status);
  }

  return (
    <DeliveriesContext.Provider
      value={{
        pedidos: data?.data || [],
        total: data?.filteredData.total || 0,
        emTransito: data?.filteredData.emTransito || 0,
        entregues: data?.filteredData.entregues || 0,
        cancelados: data?.filteredData.cancelados || 0,
        updateStatus: updateStatus.mutate,
        cancelarPedido: cancelarPedido.mutate,
        getDeliveriesByStatus,
        isFetching,
      }}
    >
      {children}
    </DeliveriesContext.Provider>
  );
}

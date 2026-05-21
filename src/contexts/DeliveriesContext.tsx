"use client";
import { api } from "@/services/api";
import { IPedido, PedidoStatus } from "@/services/mirage/types";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";
import { isDevelopment, samplePedidos } from "./StacticData";

interface DeliveriesContextData {
  updateStatus: UseMutationResult<void, Error, { id: string; status: PedidoStatus }, unknown>["mutate"];
  cancelarPedido: UseMutationResult<void, Error, string, unknown>["mutate"];
  
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;

  pedidos: IPedido[];
  total: number;
  emTransito: number;
  entregues: number;
  cancelados: number;
  getDeliveriesByStatus: (status: PedidoStatus) => IPedido[];
  isFetching: boolean;
  isLoading: boolean;
  
  allDeliveries: IPedido[],
  loadingAllDeliveries: boolean,
  isFetchingAllDeliveries: boolean,
  // refetchAllDelivery,

  oneDeliveryData: IPedido,
  loadingOneDelivery: boolean,
  isFetchingOneDelivery: boolean,
  // refetchOneDelivery
}

export interface DeliveriesQueryResult {
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
  const [id, setId] = useState<string | null>(null);

  const { data, isFetching, error, refetch, isLoading } = useQuery<DeliveriesQueryResult>({ queryKey: ['deliveries', page], queryFn: async () => {
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

  const { data: allDeliveriesData, isLoading: loadingAllDeliveries, isFetching: isFetchingAllDeliveries, refetch: refetchAllDeliveries } = useQuery({ queryKey: ['allDeliveries'], queryFn: async () => {
      const { data }: { data: IPedido[] } = await api.get("/allPedidos");
      return data;
  }});

  const { data: oneDeliveryData, isLoading: loadingOneDelivery, isFetching: isFetchingOneDelivery, refetch: refetchOneDelivery } = useQuery({queryKey: ['Deliveries', id], queryFn: async () => {
          const { data } = await api.get<IPedido>(`/pedidos/${id}`);
          return data;
      },
      enabled: !!id, 
  });

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
        updateStatus: updateStatus.mutate,
        cancelarPedido: cancelarPedido.mutate,

        page,
        setPage,

        pedidos: deliveryData || [],
        total: deliveryDataTotal || 0,
        emTransito: data?.filteredData.emTransito || 0,
        entregues: data?.filteredData.entregues || 0,
        cancelados: data?.filteredData.cancelados || 0,
        getDeliveriesByStatus,
        isFetching,
        isLoading,

        allDeliveries: allDeliveriesData || [],
        loadingAllDeliveries,
        isFetchingAllDeliveries,
        // refetchAllDelivery,

        oneDeliveryData: oneDeliveryData ? oneDeliveryData : {} as IPedido,
        loadingOneDelivery,
        isFetchingOneDelivery,
        // refetchOneDelivery 
      }}
    >
      {children}
    </DeliveriesContext.Provider>
  );
}

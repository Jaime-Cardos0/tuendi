"use client";
import { api } from "@/services/api";
import { IMotoqueiro, MotoqueiroStatus } from "@/services/mirage/types";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useState } from "react";
import { isDevelopment, sampleMotoqueiros } from "./DashboardContext";

interface RidersProviderProps {
  children: ReactNode;
}

interface RidersContextData {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  riders: IMotoqueiro[]
  total: number
  pendentes: number
  ativos: number
  suspensos: number
  updateStatus: UseMutationResult<void, Error, { id: string; status: MotoqueiroStatus }, unknown>["mutate"]
  isFetching : boolean
  isLoading : boolean
}

export const RidersContext = createContext<RidersContextData>({} as RidersContextData);

export function RidersProvider({ children }: RidersProviderProps) {

  const [page, setPage] = useState(1);

  const { data, refetch, isFetching, isLoading } = useQuery( {queryKey: ['ridersQuery'], queryFn: async () => {
    const { data, headers}: { data: IMotoqueiro[]; headers: Record<string, string> } = await api.get("/motoqueiros", { params: { page: page, perPage: 10 } });

    const {total, pendentes, ativos, suspensos} = JSON.parse(headers['x-total-count'] || '{}');

    return {data, filteredData: {total, pendentes, ativos, suspensos}};
  }});

  const ridersData = isDevelopment ? data?.data ?? [] : sampleMotoqueiros;

  const ridersDataTotal = isDevelopment ? data?.filteredData.total ?? 0 : sampleMotoqueiros.length; 

  const ridersUpdateStatusMutation = useMutation<void, Error, { id: string; status: MotoqueiroStatus }, unknown>({mutationFn: async ({ id, status }) => {
    await api.patch(`/motoqueiros/${id}`, { status });
    refetch();
  }})

  return (
    <RidersContext.Provider value={{ 
      setPage,
      page,
      riders: ridersData || [],
      total: ridersDataTotal || 0,
      pendentes: data?.filteredData.pendentes || 0,
      ativos: data?.filteredData.ativos || 0,
      suspensos: data?.filteredData.suspensos || 0,
      updateStatus: ridersUpdateStatusMutation.mutate,
      isFetching,
      isLoading,
    }}>
      {children}
    </RidersContext.Provider>
  );
}
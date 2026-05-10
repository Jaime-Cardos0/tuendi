"use client";
import { api } from "@/services/api";
import { IMotoqueiro, MotoqueiroStatus } from "@/services/mirage/types";
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

interface RidersProviderProps {
  children: ReactNode;
}

interface RidersContextData {
  riders: IMotoqueiro[]
  total: number
  pendentes: number
  ativos: number
  suspensos: number
  updateStatus: UseMutationResult<void, Error, { id: string; status: MotoqueiroStatus }, unknown>["mutate"]
}

export const RidersContext = createContext<RidersContextData>({} as RidersContextData);

export function RidersProvider({ children }: RidersProviderProps) {

  const { data, refetch } = useQuery( {queryKey: ['ridersQuery'], queryFn: async () => {
    const { data, headers}: { data: IMotoqueiro[]; headers: Record<string, string> } = await api.get("/motoqueiros");

    const {total, pendentes, ativos, suspensos} = JSON.parse(headers['x-total-count'] || '{}');

    return {data, filteredData: {total, pendentes, ativos, suspensos}};
  }});

console.log("ridersquerydata", data)
  const ridersUpdateStatusMutation = useMutation<void, Error, { id: string; status: MotoqueiroStatus }, unknown>({mutationFn: async ({ id, status }) => {
    await api.patch(`/motoqueiros/${id}`, { status });
    refetch();
  }})

  return (
    <RidersContext.Provider value={{ 
      riders: data?.data || [],
      total: data?.filteredData.total || 0,
      pendentes: data?.filteredData.pendentes || 0,
      ativos: data?.filteredData.ativos || 0,
      suspensos: data?.filteredData.suspensos || 0,
      updateStatus: ridersUpdateStatusMutation.mutate,
    }}>
      {children}
    </RidersContext.Provider>
  );
}
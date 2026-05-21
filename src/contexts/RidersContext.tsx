"use client";
import { api } from "@/services/api";
import { IMotoqueiro, MotoqueiroStatus } from "@/services/mirage/types";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useState } from "react";
import { isDevelopment, sampleMotoqueiros } from "./StacticData";

interface RidersProviderProps {
  children: ReactNode;
}

interface RidersContextData {
  updateStatus: UseMutationResult<void, Error, { id: string; status: MotoqueiroStatus }, unknown>["mutate"]

  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setId: React.Dispatch<React.SetStateAction<string | null>>

  riders: IMotoqueiro[]
  total: number
  pendentes: number
  ativos: number
  suspensos: number
  isFetching : boolean
  isLoading : boolean

  allRiders: IMotoqueiro[],
  loadingAllRiders: boolean,
  isFetchingAllRiders: boolean,
  // refetchAllRider,

  oneRiderData: IMotoqueiro,
  loadingOneRider: boolean,
  isFetchingOneRider: boolean,
  // refetchOneMotoqueiro
}

export const RidersContext = createContext<RidersContextData>({} as RidersContextData);

export function RidersProvider({ children }: RidersProviderProps) {

  const [page, setPage] = useState(1);
  const [id, setId] = useState<string | null>(null);

  const { data, refetch, isFetching, isLoading } = useQuery( {queryKey: ['ridersQuery'], queryFn: async () => {
    const { data, headers}: { data: IMotoqueiro[]; headers: Record<string, string> } = await api.get("/motoqueiros", { params: { page: page, perPage: 10 } });

    const {total, pendentes, ativos, suspensos} = JSON.parse(headers['x-total-count'] || '{}');

    return {data, filteredData: {total, pendentes, ativos, suspensos}};
  }});

  const { data: allRidersData, isLoading: loadingAllRiders, isFetching: isFetchingAllRiders, refetch: refetchAllRiders } = useQuery({ queryKey: ['allRiders'], queryFn: async () => {
          const { data }: { data: IMotoqueiro[] } = await api.get("/allMotoqueiros");
          return data;
      }});
  
      const { data: oneRiderData, isLoading: loadingOneRider, isFetching: isFetchingOneRider, refetch: refetchOneRider } = useQuery({queryKey: ['riders', id], queryFn: async () => {
              const { data } = await api.get<IMotoqueiro>(`/motoqueiros/${id}`);
              return data;
          },
          enabled: !!id, 
      });

  const ridersData = isDevelopment ? data?.data ?? [] : sampleMotoqueiros;

  const ridersDataTotal = isDevelopment ? data?.filteredData.total ?? 0 : sampleMotoqueiros.length; 

  const ridersUpdateStatusMutation = useMutation<void, Error, { id: string; status: MotoqueiroStatus }, unknown>({mutationFn: async ({ id, status }) => {
    await api.patch(`/motoqueiros/${id}`, { status });
    refetch();
  }})

  return (
    <RidersContext.Provider value={{ 
      updateStatus: ridersUpdateStatusMutation.mutate,
      
      setPage,
      page,
      setId,

      riders: ridersData || [],
      total: ridersDataTotal || 0,
      pendentes: data?.filteredData.pendentes || 0,
      ativos: data?.filteredData.ativos || 0,
      suspensos: data?.filteredData.suspensos || 0,
      isFetching,
      isLoading,

      allRiders: allRidersData || [],
      loadingAllRiders,
      isFetchingAllRiders,
      // refetchAllRider,

      oneRiderData: oneRiderData ? oneRiderData : {} as IMotoqueiro,
      loadingOneRider,
      isFetchingOneRider,
      // refetchOneRider 
    }}>
      {children}
    </RidersContext.Provider>
  );
}
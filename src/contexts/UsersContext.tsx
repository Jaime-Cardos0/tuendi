"use client"

import { api } from "@/services/api";
import { IUser, UserStatus } from "@/services/mirage/types";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { ReactNode, createContext, useEffect, useState } from "react";
import { isDevelopment, sampleClientes } from "./DashboardContext";

interface UsersContextData {
    page: number;
    total: number;
    clientes: number;
    motoqueiroCount: number;
    suspensos: number;
    users: IUser[];
    updateStatus: UseMutationResult<void, Error, { id: string; status: UserStatus }, unknown>["mutate"];
    deleteUser: UseMutationResult<void, Error, string, unknown>["mutate"];
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface UsersProviderProps {
    children: ReactNode,
}


export const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export function UsersProvider({children}: UsersProviderProps){
    const [page, setPage] = useState(1);

    const {data, refetch} = useQuery( {queryKey: ['usersQuery', page], queryFn: async () => {
        const {data, headers}: { data: IUser[]; headers: Record<string, string> } = await api.get("/users", { params: { page: page, perPage: 10 } });
        const {total, clientes, motoqueiroCount, suspensos} = JSON.parse(headers['x-total-count'] || '{}');
        return { data, filteredData: { total, clientes, motoqueiroCount, suspensos } };
    }});

    const usersData = isDevelopment ? data?.data ?? sampleClientes : sampleClientes;

    const usersDataTotal = isDevelopment ? data?.filteredData.total ?? sampleClientes.length : sampleClientes.length;

    const usersUpdateStatusMutation = useMutation({ mutationFn: async ({ id, status }: { id: string; status: UserStatus }) => {
        await api.patch(`/users/${id}`, { status });
        refetch();
    }});

    const usersDeleteMutation = useMutation({ mutationFn: async (id: string) => {
        await api.delete(`/users/${id}`);
        refetch();
    }});

    return (
        <UsersContext.Provider value={{ 
            page,
            total: usersDataTotal || 0,
            clientes: data?.filteredData.clientes || 0,
            motoqueiroCount: data?.filteredData.motoqueiroCount || 0,
            suspensos: data?.filteredData.suspensos || 0,
            users: usersData || [],
            updateStatus: usersUpdateStatusMutation.mutate,
            deleteUser: usersDeleteMutation.mutate,
            setPage,
        }}>
          {children}
        </UsersContext.Provider>
      );
}
"use client"

import { api } from "@/services/api";
import { IUser, UserStatus } from "@/services/mirage/types";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { ReactNode, createContext, useEffect, useState } from "react";
import { isDevelopment, sampleClientes } from "./StacticData";

interface UsersContextData {
    updateStatus: UseMutationResult<void, Error, { id: string; status: UserStatus }, unknown>["mutate"];
    deleteUser: UseMutationResult<void, Error, string, unknown>["mutate"];

    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setId: React.Dispatch<React.SetStateAction<string | null>>;

    total: number;
    clientes: number;
    motoqueiroCount: number;
    suspensos: number;
    users: IUser[];
    isFetching: boolean;
    isLoading: boolean;
    // refetch,

    allUsers: IUser[],
    loadingAllUsers: boolean,
    isFetchingAllUsers: boolean,
    // refetchAllUser,

    oneUserData: IUser,
    loadingOneUser: boolean,
    isFetchingOneUser: boolean,
    // refetchOneUser
}

interface UsersProviderProps {
    children: ReactNode,
}


export const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export function UsersProvider({children}: UsersProviderProps){
    const [page, setPage] = useState(1);
    const [id, setId] = useState<string | null>(null);

    const {data: usersDataPerPage, refetch, isFetching: fetchingUsersPerPage, isLoading: loadingUsersPerPage} = useQuery( {queryKey: ['usersQuery', page], queryFn: async () => {
        const {data, headers}: { data: IUser[]; headers: Record<string, string> } = await api.get("/users", { params: { page: page, perPage: 10 } });
        const {total, clientes, motoqueiroCount, suspensos} = JSON.parse(headers['x-total-count'] || '{}'); 
        return { data, filteredData: { total, clientes, motoqueiroCount, suspensos } };
    }});

    const { data: allUsersData, isLoading: loadingAllUsers, isFetching: isFetchingAllUsers, refetch: refetchAllUsers } = useQuery({ queryKey: ['allUsers'], queryFn: async () => {
        const { data }: { data: IUser[] } = await api.get("/allUsers");
        return data;
    }});

    const { data: oneUserData, isLoading: loadingOneUser, isFetching: isFetchingOneUser, refetch: refetchOneUser } = useQuery({queryKey: ['users', id], queryFn: async () => {
            const { data } = await api.get<IUser>(`/users/${id}`);
            return data;
        },
        enabled: !!id, 
    });



    const usersData = isDevelopment ? usersDataPerPage?.data ?? [] : sampleClientes;

    const usersDataTotal = isDevelopment ? usersDataPerPage?.filteredData.total ?? 0 : sampleClientes.length;

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
            updateStatus: usersUpdateStatusMutation.mutate,
            deleteUser: usersDeleteMutation.mutate,

            page,
            setPage,
            setId,

            total: usersDataTotal || 0,
            clientes: usersDataPerPage?.filteredData.clientes || 0,
            motoqueiroCount: usersDataPerPage?.filteredData.motoqueiroCount || 0,
            suspensos: usersDataPerPage?.filteredData.suspensos || 0,
            users: usersData || [],
            isFetching: fetchingUsersPerPage,
            isLoading: loadingUsersPerPage,

            allUsers: allUsersData || [],
            loadingAllUsers,
            isFetchingAllUsers,
            // refetchAllUser,

            oneUserData: oneUserData ? oneUserData : {} as IUser,
            loadingOneUser,
            isFetchingOneUser,
            // refetchOneUser 
        }}>
          {children}
        </UsersContext.Provider>
      );
}
import { api } from "@/services/api";
import { IUser, UserStatus } from "@/services/mirage/types";
import { ReactNode, createContext, useEffect, useState } from "react";

interface UsersContextData {
    users: IUser[];
    updateStatus: (id: string, status: UserStatus) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
}

interface UsersProviderProps {
    children: ReactNode,
}


export const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export function UsersProvider({children}: UsersProviderProps){
    const [users, setUsers] = useState<IUser[]>([]);
    
    useEffect(() => {
        api.get("/users")
          .then((res) => setUsers(res.data))
          .catch((err) => console.error(err));
    }, []);

    async function updateStatus(id: string, status: UserStatus) {
        await api.patch(`/users/${id}`, { status });
        setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status } : u))
        );
    }

    async function deleteUser(id: string) {
        await api.delete(`/users/${id}`);
        setUsers((prev) => prev.filter((u) => u.id !== id));
    }    

    return (
        <UsersContext.Provider value={{ users, updateStatus, deleteUser }}>
          {children}
        </UsersContext.Provider>
      );
}
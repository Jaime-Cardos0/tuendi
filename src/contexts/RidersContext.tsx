"use client";
import { api } from "@/services/api";
import { IMotoqueiro, MotoqueiroStatus } from "@/services/mirage/types";
import { createContext, ReactNode, useEffect, useState } from "react";

interface RidersProviderProps {
  children: ReactNode;
}

interface RidersContextData {
  riders: IMotoqueiro[];
  updateStatus: (id: string, status: MotoqueiroStatus) => Promise<void>;
}

export const RidersContext = createContext<RidersContextData>({} as RidersContextData);

export function RidersProvider({ children }: RidersProviderProps) {
  const [riders, setRiders] = useState<IMotoqueiro[]>([]);

  useEffect(() => {
    api.get("/motoqueiros")
      .then((res) => setRiders(res.data))
      .catch((err) => console.error(err));
  }, []);

  async function updateStatus(id: string, status: MotoqueiroStatus) {
    await api.patch(`/motoqueiros/${id}`, { status });
    setRiders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  }

  return (
    <RidersContext.Provider value={{ riders, updateStatus }}>
      {children}
    </RidersContext.Provider>
  );
}
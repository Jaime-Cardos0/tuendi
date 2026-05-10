"use client";
import { createContext, ReactNode, useState } from "react";
import { IUser } from "@/services/mirage/types";

interface LoginContextData {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (user: IUser) => void;
  logout: () => void;
  updateUser: (user: IUser) => void;
}

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginContext = createContext<LoginContextData>({} as LoginContextData);

export function LoginProvider({ children }: LoginProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(userData: IUser) {
    setUser(userData);
    setIsAuthenticated(true);
  }

  function logout() {
    setUser(null);
    setIsAuthenticated(false);
  }

  function updateUser(userData: IUser) {
    setUser(userData);
  }

  return (
    <LoginContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

"use client";
import { api } from "@/services/api";
import { IPedido, IMotoqueiro, IUser, ISubscricao } from "@/services/mirage/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";

interface DashboardContextData {
  pedidos: IPedido[];
  totalPedidos: number;
  totalReceita: number;
  totalMotoqueiros: number;
  totalUsuarios: number;
  pedidosRecentes: IPedido[];
  isFetching: boolean;
  receitaPorMes: (pedidos: IPedido[]) => number[];
  entregasPorMes: (pedidos: IPedido[]) => number[];
  motoqueiros: IMotoqueiro[];
  clientes: IUser[];
}

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardContext = createContext<DashboardContextData>({} as DashboardContextData);

const isDevelopment = process.env.NODE_ENV === "development";

const sampleClientes: IUser[] = [
  {
    id: "cliente-1",
    firebaseUid: "uid-cliente-1",
    nome: "Ana",
    sobrenome: "Sousa",
    email: "ana.sousa@example.com",
    telefone: "+244923000111",
    telefoneVerificado: true,
    numeroDocumento: "1234567890",
    tipoDocumento: "BI",
    fotoPerfil: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=256&q=80",
    dataNascimento: "1990-05-14",
    role: "cliente",
    status: "activo",
    criadoEm: "2025-11-10T08:15:00.000Z",
    atualizadoEm: "2025-11-10T08:15:00.000Z",
  },
  {
    id: "cliente-2",
    firebaseUid: "uid-cliente-2",
    nome: "Luís",
    sobrenome: "Mendes",
    email: "luis.mendes@example.com",
    telefone: "+244923000222",
    telefoneVerificado: true,
    numeroDocumento: "0987654321",
    tipoDocumento: "BI",
    fotoPerfil: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    dataNascimento: "1987-08-02",
    role: "cliente",
    status: "activo",
    criadoEm: "2025-10-25T11:30:00.000Z",
    atualizadoEm: "2025-10-25T11:30:00.000Z",
  },
];

const sampleMotoqueiros: IMotoqueiro[] = [
  {
    id: "moto-1",
    userId: "uid-moto-1",
    classificacaoMedia: 4.9,
    totalAvaliacoes: 124,
    statusDisponibilidade: "online",
    status: "activo",
    morada: "Av. Revolução, Luanda",
    aprovadoEm: "2025-10-01T09:00:00.000Z",
    motivoRejeicao: null,
    criadoEm: "2025-09-30T15:20:00.000Z",
    user: {
      id: "moto-user-1",
      firebaseUid: "uid-moto-1",
      nome: "Miguel",
      sobrenome: "Oliveira",
      email: "miguel.oliveira@example.com",
      telefone: "+244923000333",
      telefoneVerificado: true,
      numeroDocumento: "1112223334",
      tipoDocumento: "BI",
      fotoPerfil: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
      dataNascimento: "1992-07-23",
      role: "motoqueiro",
      status: "activo",
      criadoEm: "2025-09-30T15:20:00.000Z",
      atualizadoEm: "2025-09-30T15:20:00.000Z",
    },
    veiculo: {
      id: "veiculo-1",
      motoqueiroId: "moto-1",
      marca: "Yamaha",
      modelo: "YBR 125",
      placa: "AGT-001",
      corPrincipal: "preto",
      ano: 2020,
      ativo: true,
      criadoEm: "2025-09-30T15:20:00.000Z",
    },
    uploads: [],
  },
  {
    id: "moto-2",
    userId: "uid-moto-2",
    classificacaoMedia: 4.5,
    totalAvaliacoes: 89,
    statusDisponibilidade: "ocupado",
    status: "activo",
    morada: "Rua Comandante Gika, Luanda",
    aprovadoEm: "2025-10-15T14:45:00.000Z",
    motivoRejeicao: null,
    criadoEm: "2025-10-14T13:10:00.000Z",
    user: {
      id: "moto-user-2",
      firebaseUid: "uid-moto-2",
      nome: "Sara",
      sobrenome: "Pinto",
      email: "sara.pinto@example.com",
      telefone: "+244923000444",
      telefoneVerificado: true,
      numeroDocumento: "5556667778",
      tipoDocumento: "BI",
      fotoPerfil: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
      dataNascimento: "1995-03-11",
      role: "motoqueiro",
      status: "activo",
      criadoEm: "2025-10-14T13:10:00.000Z",
      atualizadoEm: "2025-10-14T13:10:00.000Z",
    },
    veiculo: {
      id: "veiculo-2",
      motoqueiroId: "moto-2",
      marca: "Honda",
      modelo: "CG 160",
      placa: "AGT-002",
      corPrincipal: "vermelho",
      ano: 2021,
      ativo: true,
      criadoEm: "2025-10-14T13:10:00.000Z",
    },
    uploads: [],
  },
];

const sampleSubscricoes: ISubscricao[] = [
  {
    id: "sub-1",
    motoqueiroId: "moto-1",
    plano: "mensal",
    valor: 3600,
    status: "activa",
    inicioEm: "2025-10-01T00:00:00.000Z",
    expiraEm: "2025-10-31T23:59:59.000Z",
    criadoEm: "2025-10-01T00:00:00.000Z",
    motoqueiro: sampleMotoqueiros[0],
  },
  {
    id: "sub-2",
    motoqueiroId: "moto-2",
    plano: "semanal",
    valor: 900,
    status: "activa",
    inicioEm: "2025-10-20T00:00:00.000Z",
    expiraEm: "2025-10-26T23:59:59.000Z",
    criadoEm: "2025-10-20T00:00:00.000Z",
    motoqueiro: sampleMotoqueiros[1],
  },
];

const samplePedidos: IPedido[] = [
  {
    id: "pedido-1",
    numeroPedido: "PED-001",
    clienteId: sampleClientes[0].id,
    motoqueiroId: sampleMotoqueiros[0].id,
    status: "entregue",
    origemEndereco: "Av. Amílcar Cabral, Luanda",
    destinoEndereco: "Rua da Missão, Viana",
    descricaoEncomenda: "Caixa de remédios",
    fragil: true,
    valorEntrega: 4500,
    distanciaKm: 12.4,
    metodoPagamento: "dinheiro",
    motivoCancelamento: null,
    criadoEm: "2025-11-08T09:45:00.000Z",
    entregueEm: "2025-11-08T10:30:00.000Z",
    canceladoEm: null,
    cliente: sampleClientes[0],
    motoqueiro: sampleMotoqueiros[0],
    userDataMotoqueiro: sampleMotoqueiros[0].user,
  },
  {
    id: "pedido-2",
    numeroPedido: "PED-002",
    clienteId: sampleClientes[1].id,
    motoqueiroId: sampleMotoqueiros[1].id,
    status: "em_transito",
    origemEndereco: "Colina de Luanda, Ilha",
    destinoEndereco: "Talatona Business Park",
    descricaoEncomenda: "Documentos importantes",
    fragil: false,
    valorEntrega: 3200,
    distanciaKm: 8.9,
    metodoPagamento: "stripe",
    motivoCancelamento: null,
    criadoEm: "2025-11-09T14:15:00.000Z",
    entregueEm: null,
    canceladoEm: null,
    cliente: sampleClientes[1],
    motoqueiro: sampleMotoqueiros[1],
    userDataMotoqueiro: sampleMotoqueiros[1].user,
  },
  {
    id: "pedido-3",
    numeroPedido: "PED-003",
    clienteId: sampleClientes[0].id,
    motoqueiroId: null,
    status: "a_procurar_motoqueiro",
    origemEndereco: "Bairro do Talho, Luanda",
    destinoEndereco: "Casino Royal, Marginal",
    descricaoEncomenda: "Peças para computador",
    fragil: false,
    valorEntrega: 1800,
    distanciaKm: 5.6,
    metodoPagamento: "dinheiro",
    motivoCancelamento: null,
    criadoEm: "2025-11-10T11:00:00.000Z",
    entregueEm: null,
    canceladoEm: null,
    cliente: sampleClientes[0],
    motoqueiro: null,
    userDataMotoqueiro: {
      ...sampleMotoqueiros[0].user,
      id: "unknown",
      nome: "Não atribuído",
      sobrenome: "",
    },
  },
  {
    id: "pedido-4",
    numeroPedido: "PED-004",
    clienteId: sampleClientes[1].id,
    motoqueiroId: sampleMotoqueiros[0].id,
    status: "cancelado",
    origemEndereco: "Cacuaco Centro",
    destinoEndereco: "Kikolo",
    descricaoEncomenda: "Cestas de alimentos",
    fragil: false,
    valorEntrega: 2200,
    distanciaKm: 10.2,
    metodoPagamento: "dinheiro",
    motivoCancelamento: "Cliente cancelou antes da coleta",
    criadoEm: "2025-11-05T16:20:00.000Z",
    entregueEm: null,
    canceladoEm: "2025-11-05T16:45:00.000Z",
    cliente: sampleClientes[1],
    motoqueiro: sampleMotoqueiros[0],
    userDataMotoqueiro: sampleMotoqueiros[0].user,
  },
];

export function DashboardProvider({ children }: DashboardProviderProps) {
  const pedidosQuery = useQuery<IPedido[]>({ queryKey: ['pedidosQuery'], queryFn: async () => {
    const res = await api.get("/pedidos");
    return res.data;
  }, enabled: isDevelopment, retry: false });

  const motoqueirosQuery = useQuery<IMotoqueiro[]>({ queryKey: ['motoqueirosQuery'], queryFn: async () => {
    const res = await api.get("/motoqueiros");
    return res.data;
  }, enabled: isDevelopment, retry: false });

  const usuariosQuery = useQuery<IUser[]>({ queryKey: ['usuariosQuery'], queryFn: async () => {
    const res = await api.get("/users");
    return res.data;
  }, enabled: isDevelopment, retry: false });

  const subscricoesQuery = useQuery<ISubscricao[]>({ queryKey: ['subscricoesQuery'], queryFn: async () => {
    const res = await api.get("/subscricoes");
    return res.data;
  }, enabled: isDevelopment, retry: false });

  const pedidosData = isDevelopment ? pedidosQuery.data ?? samplePedidos : samplePedidos;
  const motoqueirosData = isDevelopment ? motoqueirosQuery.data ?? sampleMotoqueiros : sampleMotoqueiros;
  const usuariosData = isDevelopment ? usuariosQuery.data ?? sampleClientes : sampleClientes;
  const subscricoesData = isDevelopment ? subscricoesQuery.data ?? sampleSubscricoes : sampleSubscricoes;

  const totalReceita = subscricoesData.reduce((acc, s) => acc + s.valor, 0);
  const pedidosRecentes = [...pedidosData].sort((a, b) => 
    new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
  ).slice(0, 10);

  function receitaPorMes(pedidos: IPedido[]) {
    const totais = Array(12).fill(0);
    pedidos
      .filter((p) => p.status === "entregue")
      .forEach((p) => {
        const mes = new Date(p.criadoEm).getMonth();
        totais[mes] += p.valorEntrega;
      });
    return totais;
  }
  
  function entregasPorMes(pedidos: IPedido[]) {
    const totais = Array(12).fill(0);
    pedidos
      .filter((p) => p.status === "entregue")
      .forEach((p) => {
        const mes = new Date(p.criadoEm).getMonth();
        totais[mes] += 1;
      });
    return totais;
  }

  return (
    <DashboardContext.Provider
      value={{
        pedidos: pedidosData,
        motoqueiros: motoqueirosData,
        clientes: usuariosData,
        totalPedidos: pedidosData.length,
        totalReceita,
        totalMotoqueiros: motoqueirosData.length,
        totalUsuarios: usuariosData.length,
        pedidosRecentes,
        isFetching: pedidosQuery.isFetching ?? motoqueirosQuery.isFetching ?? usuariosQuery.isFetching ?? subscricoesQuery.isFetching,
        receitaPorMes: (pedidos) => receitaPorMes(pedidos),
        entregasPorMes: (pedidos) => entregasPorMes(pedidos),
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

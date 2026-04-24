export type Role = "CLIENT" | "RYDER" | "ADMIN";

export type StatusPedido =
  | "PENDENTE"
  | "ACEITO"
  | "EM_ANDAMENTO"
  | "ENTREGUE"
  | "CANCELADO";

export interface IUser {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  firebaseUid: string;
  createdAt: string;
  role: Role;
}

export interface IPedido {
  id: string;
  origem: string;
  destino: string;
  preco: number;
  status: StatusPedido;
}

// types.ts
export type RiderStatus = "PENDENTE" | "APROVADO" | "RECUSADO" | "REVISAO";

export interface IRider {
  id: string;
  // Dados pessoais
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  profilePhoto: string;
  // Bilhete de identidade
  biNumber: string;
  biFront: string;
  biBack: string;
  // Carta de condução
  licenseNumber: string;
  licenseFront: string;
  licenseBack: string;
  // Veículo
  vehiclePhoto: string;
  vehiclePlatePhoto: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleColor: string;
  vehiclePlate: string;
  // Sistema
  status: RiderStatus;
  createdAt: string;
}
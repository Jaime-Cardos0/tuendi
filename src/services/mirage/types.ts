export type Role = "CLIENT" | "MOTOQUEIRO" | "ADMIN";

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
  role: Role;
}

export interface IPedido {
  id: string;
  origem: string;
  destino: string;
  preco: number;
  status: StatusPedido;
}
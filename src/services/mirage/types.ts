// src/services/mirage/types.ts

export type Role = "cliente" | "motoqueiro" | "admin";
export type UserStatus = "activo" | "suspenso";

export type MotoqueiroStatus = "pendente_aprovacao" | "activo" | "suspenso";
export type DisponibilidadeStatus = "online" | "offline" | "ocupado";

export type PedidoStatus =
  | "pendente"
  | "a_procurar_motoqueiro"
  | "motoqueiro_atribuido"
  | "a_caminho_coleta"
  | "recolhido"
  | "em_transito"
  | "entregue"
  | "cancelado";

export type UploadTipo =
  | "foto_perfil"
  | "documento_bi_frente"
  | "documento_bi_verso"
  | "documento_carta_frente"
  | "documento_carta_verso"
  | "foto_veiculo"
  | "prova_entrega";

export type UploadStatus = "pendente" | "aprovado" | "rejeitado";
export type TransacaoTipo = "credito" | "debito";
export type MetodoPagamento = "dinheiro" | "stripe";
export type NotificacaoTipo =
  | "pedido_criado"
  | "pedido_aceite"
  | "pedido_entregue"
  | "pagamento"
  | "nova_mensagem"
  | "sistema";
export type SuporteStatus = "aberto" | "em_analise" | "resolvido";

export interface IUser {
  id: string;
  firebaseUid: string;
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  telefoneVerificado: boolean;
  numeroDocumento: string;
  tipoDocumento: string;
  fotoPerfil: string;
  dataNascimento: string;
  role: Role;
  status: UserStatus;
  criadoEm: string;
  atualizadoEm: string;
}

export interface IVeiculo {
  id: string;
  motoqueiroId: string;
  marca: string;
  modelo: string;
  placa: string;
  corPrincipal: string;
  ano: number;
  ativo: boolean;
  criadoEm: string;
}

export interface IUpload {
  id: string;
  userId: string;
  tipo: UploadTipo;
  nomeOriginal: string;
  mimeType: string;
  tamanho: number;
  status: UploadStatus;
  motivoRejeicao: string | null;
  url: string; // simulado no Mirage com faker.image.url()
  criadoEm: string;
}

export interface IMotoqueiro {
  id: string;
  userId: string;
  classificacaoMedia: number;
  totalAvaliacoes: number;
  statusDisponibilidade: DisponibilidadeStatus;
  status: MotoqueiroStatus;
  morada: string;
  aprovadoEm: string | null;
  motivoRejeicao: string | null;
  criadoEm: string;
  // montado pelo Mirage (opção A)
  user: IUser;
  veiculo: IVeiculo;
  uploads: IUpload[];
}

export interface IPedido {
  id: string;
  numeroPedido: string;
  clienteId: string;
  motoqueiroId: string | null;
  status: PedidoStatus;
  origemEndereco: string;
  destinoEndereco: string;
  descricaoEncomenda: string;
  fragil: boolean;
  valorEntrega: number;
  distanciaKm: number;
  metodoPagamento: MetodoPagamento;
  motivoCancelamento: string | null;
  criadoEm: string;
  entregueEm: string | null;
  canceladoEm: string | null;
  // montado
  cliente: IUser;
  motoqueiro: IMotoqueiro | null;
}

export interface IAvaliacao {
  id: string;
  pedidoId: string;
  notaCliente: number | null;
  comentarioCliente: string | null;
  notaMotoqueiro: number | null;
  comentarioMotoqueiro: string | null;
  criadoEm: string;
}

export interface ICarteira {
  id: string;
  userId: string;
  saldo: number;
  criadoEm: string;
}

export interface ITransacao {
  id: string;
  carteiraId: string;
  tipo: TransacaoTipo;
  valor: number;
  descricao: string;
  pedidoId: string | null;
  saldoAnterior: number;
  saldoAtual: number;
  criadoEm: string;
}

export interface INotificacao {
  id: string;
  userId: string;
  tipo: NotificacaoTipo;
  titulo: string;
  mensagem: string;
  lida: boolean;
  criadoEm: string;
}

export interface ISuporte {
  id: string;
  userId: string;
  titulo: string;
  descricao: string;
  status: SuporteStatus;
  resposta: string | null;
  respondidoPor: string | null;
  criadoEm: string;
  resolvidoEm: string | null;
}
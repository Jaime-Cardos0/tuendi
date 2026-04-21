import { createServer, Server } from "miragejs";

import {
  UserModel,
  PedidoModel,
  PagamentoModel,
  ChatModel,
  MensagemModel,
} from "./models";

import {
  UserFactory,
  PedidoFactory,
  PagamentoFactory,
  MensagemFactory,
} from "./factories";

import { seeds } from "./seeds";

export function makeServer(): Server {
  return createServer({
    models: {
      user: UserModel,
      pedido: PedidoModel,
      pagamento: PagamentoModel,
      chat: ChatModel,
      mensagem: MensagemModel,
    },

    factories: {
      user: UserFactory,
      pedido: PedidoFactory,
      pagamento: PagamentoFactory,
      mensagem: MensagemFactory,
    },

    seeds,

    routes() {
      this.namespace = "api";

      this.get("/users");
      this.get("/pedidos");
      this.get("/pagamentos");
      this.get("/mensagens");
    },
  });
}
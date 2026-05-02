// src/services/mirage/seeds.ts
import { Server } from "miragejs";

export function seeds(server: Server) {
  // Criar clientes
  const clientes = server.createList("user", 15, { role: "cliente" });

  // Criar users que serão motoqueiros
  const usersMoto = server.createList("user", 10, { role: "motoqueiro" });

  // Criar motoqueiros com user, veiculo e uploads associados
  const motoqueiros = usersMoto.map((user) => {
    const motoqueiro = server.create("motoqueiro", { user });

    server.create("veiculo", { motoqueiro });

    const tiposUpload = [
      "documento_bi_frente",
      "documento_bi_verso",
      "documento_carta_frente",
      "documento_carta_verso",
      "foto_veiculo",
    ] as const;

    tiposUpload.forEach((tipo) => {
      server.create("upload", { user, tipo });
    });

    return motoqueiro;
  });

  // Criar carteiras para todos os users
  [...clientes, ...usersMoto].forEach((user) => {
    const carteira = server.create("carteira", { user });

    server.createList("transacao", 3, { carteira });
  });

  // Criar pedidos
  clientes.forEach((cliente, i) => {
    const motoqueiro = motoqueiros[i % motoqueiros.length];
    const pedido = server.create("pedido", { cliente, motoqueiro });

    server.create("avaliacao", { pedido });
  });

  // Criar notificações
  [...clientes, ...usersMoto].forEach((user) => {
    server.createList("notificacao", 2, { user });
  });

  // Criar suportes
  clientes.slice(0, 5).forEach((user) => {
    server.create("suporte", { user });
  });
}
import { Server } from "miragejs";

export function seeds(server: Server) {
  const users = server.createList("user", 10);

  users.slice(0, 5).forEach((user) => {
    server.create("motoqueiro", { user });
  });

  const pedidos = server.createList("pedido", 10, {
    cliente: users[0],
    motoqueiro: users[1],
  });

  pedidos.forEach((pedido) => {
    server.create("pagamento", { pedido });
  });

  users.forEach((user) => {
    server.create("carteira", {
      user,
      saldo: Math.floor(Math.random() * 1000),
    });
  });

  pedidos.forEach((pedido) => {
    const chat = server.create("chat", { pedido });

    for (let i = 0; i < 3; i++) {
      server.create("mensagem", {
        chat,
        sender: users[Math.floor(Math.random() * users.length)],
      });
    }
  });
}
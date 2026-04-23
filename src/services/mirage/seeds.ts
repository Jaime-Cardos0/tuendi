import { Server } from "miragejs";

export function seeds(server: Server) {
  const users = server.createList("user", 10);

  const riders = users.slice(0, 5).map((user) => server.create("rider", { user }));

  users.forEach((user) => {
    server.create("wallet", { user, balance: 1000 });
  });

  riders.forEach((rider) => {
    const client = users[Math.floor(Math.random() * users.length)];
    const order = server.create("order", { client, rider });
    server.create("payment", { order });
  });

  const orders = server.createList("order", 10, {
    client: users[0],
    rider: users[1],
  });

  orders.forEach((order) => {
    server.create("payment", { order });
  });

  server.db.dump();

}
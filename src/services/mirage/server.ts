import { createServer, Server } from "miragejs";

import {
  userModel,
  orderModel,
  paymentModel,
  riderModel,
  transactionModel,
  locationModel,
  walletModel,
} from "./models";

import {
  userFactory,
  orderFactory,
  paymentFactory,
  riderFactory,
  transactionFactory,
  locationFactory,
  walletFactory,
} from "./factories";

import { seeds } from "./seeds";

export function makeServer(): Server {
  return createServer({
    models: {
      user: userModel,
      order: orderModel,
      payment: paymentModel,
      rider: riderModel,
      transaction: transactionModel,
      location: locationModel,
      wallet: walletModel,
    },

    factories: {
      user: userFactory,
      order: orderFactory,
      payment: paymentFactory,
      rider: riderFactory,
      transaction: transactionFactory,
      location: locationFactory,
      wallet: walletFactory,
    },

    seeds,

    routes() {
      this.namespace = "api";

      this.get("/users");
      this.get("/orders");
      this.get("/payments");
      this.get("/riders");
      this.get("/transactions");
      this.get("/locations");
      this.get("/wallets");
      
      this.patch("/riders/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        return (schema as any).riders.find(id).update(attrs);
      });
    },
  });
}
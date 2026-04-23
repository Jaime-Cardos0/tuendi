// models.ts
import { Model, belongsTo, hasMany } from "miragejs";

export const userModel = Model.extend({
  rider: hasMany("rider"),
  orders: hasMany("order"),
  wallet: belongsTo("wallet"),
});

export const riderModel = Model.extend({
  user: belongsTo("user"),
  orders: hasMany("order"),
});

export const orderModel = Model.extend({
  client: belongsTo("user"),
  rider: belongsTo("rider"),
  payment: belongsTo("payment"),
});

export const paymentModel = Model.extend({
  order: belongsTo("order"),
});

export const walletModel = Model.extend({
  user: belongsTo("user"),
});

export const transactionModel = Model.extend({});
export const locationModel = Model.extend({});
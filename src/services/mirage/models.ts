import {
  Model,
  belongsTo,
  hasMany,
} from "miragejs";

export const UserModel = Model.extend({
  pedidos: hasMany("pedido"),
  transacoes: hasMany("transacao"),
  mensagens: hasMany("mensagens"),
});

export const MotoqueiroModel = Model.extend({
  user: belongsTo("user"),
});

export const PedidoModel = Model.extend({
  cliente: belongsTo("user"),
  motoqueiro: belongsTo("user"),
});

export const PagamentoModel = Model.extend({
  pedido: belongsTo(),
});

export const ChatModel = Model.extend({
  pedido: belongsTo(),
  mensagens: hasMany(),
});

export const MensagemModel = Model.extend({
  chat: belongsTo(),
  sender: belongsTo("user"),
});
// src/services/mirage/server.ts
import { createServer, Server, Response } from "miragejs";
import {
  userModel, motoqueiroModel, veiculoModel, uploadModel,
  pedidoModel, avaliacaoModel, carteiraModel, transacaoModel,
  notificacaoModel, suporteModel,
} from "./models";
import {
  userFactory, motoqueiroFactory, veiculoFactory, uploadFactory,
  pedidoFactory, avaliacaoFactory, carteiraFactory, transacaoFactory,
  notificacaoFactory, suporteFactory,
} from "./factories";
import { seeds } from "./seeds";

export function makeServer(): Server {
  return createServer({
    models: {
      user: userModel,
      motoqueiro: motoqueiroModel,
      veiculo: veiculoModel,
      upload: uploadModel,
      pedido: pedidoModel,
      avaliacao: avaliacaoModel,
      carteira: carteiraModel,
      transacao: transacaoModel,
      notificacao: notificacaoModel,
      suporte: suporteModel,
    },

    factories: {
      user: userFactory,
      motoqueiro: motoqueiroFactory,
      veiculo: veiculoFactory,
      upload: uploadFactory,
      pedido: pedidoFactory,
      avaliacao: avaliacaoFactory,
      carteira: carteiraFactory,
      transacao: transacaoFactory,
      notificacao: notificacaoFactory,
      suporte: suporteFactory,
    },

    seeds,

    routes() {
      this.namespace = "api";

      // Users
      this.get("/users", (schema) => {
        return schema.all("user").models.map((u) => u.attrs);
      });

      this.get("/users/:id", (schema, request) => {
        const users = schema.find("user", request.params.id)?.attrs;
        if (!users) return new Response(404, {}, { error: "User not found" });
        return users;
      });

      this.patch("/users/:id", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const user = schema.find("user", request.params.id);
        if (!user) return new Response(404, {}, { error: "User not found" });
        return user.update(attrs);
      });

      this.delete("/users/:id", (schema, request) => {
        const user = schema.find("user", request.params.id);
        user?.destroy();
        return { message: "Utilizador eliminado" };
      });

      // Motoqueiros — devolve dados montados (opção A)
      this.get("/motoqueiros", (schema) => {
        return schema.all("motoqueiro").models.map((m) => {
          const user = m.user?.attrs ?? {};
          const veiculo = m.veiculo?.attrs ?? {};
          const uploads = m.uploads?.models.map((u) => u.attrs) ?? [];
          return { ...m.attrs, user, veiculo, uploads };
        });
      });

      this.get("/motoqueiros/:id", (schema, request) => {
        const m = schema.find("motoqueiro", request.params.id);
        if (!m) return null;
        const user = m.user?.attrs ?? {};
        const veiculo = m.veiculo?.attrs ?? {};
        const uploads = m.uploads?.models.map((u) => u.attrs) ?? [];
        return { ...m.attrs, user, veiculo, uploads };
      });

      this.patch("/motoqueiros/:id", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const m = schema.find("motoqueiro", request.params.id);
        return m?.update(attrs);
      });

      // Pedidos — devolve dados montados
      this.get("/pedidos", (schema) => {
        return schema.all("pedido").models.map((p) => {
          const cliente = p.cliente?.attrs ?? {};
          const motoqueiro = p.motoqueiro?.attrs ?? null;
          return { ...p.attrs, cliente, motoqueiro };
        });
      });

      this.get("/pedidos/:id", (schema, request) => {
        const p = schema.find("pedido", request.params.id);
        if (!p) return null;
        return { ...p.attrs, cliente: p.cliente?.attrs, motoqueiro: p.motoqueiro?.attrs };
      });

      this.patch("/pedidos/:id", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.find("pedido", request.params.id)?.update(attrs);
      });

      // Carteiras
      this.get("/carteiras", (schema) => schema.all("carteira").models.map((c) => c.attrs));
      this.get("/carteiras/:id", (schema, request) => schema.find("carteira", request.params.id)?.attrs);

      // Transacoes
      this.get("/transacoes", (schema) => schema.all("transacao").models.map((t) => t.attrs));

      // Avaliacoes
      this.get("/avaliacoes", (schema) => schema.all("avaliacao").models.map((a) => a.attrs));

      // Notificacoes
      this.get("/notificacoes", (schema) => schema.all("notificacao").models.map((n) => n.attrs));
      this.patch("/notificacoes/:id", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.find("notificacao", request.params.id)?.update(attrs);
      });

      // Suportes
      this.get("/suportes", (schema) => schema.all("suporte").models.map((s) => s.attrs));
      this.patch("/suportes/:id", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.find("suporte", request.params.id)?.update(attrs);
      });
    },
  });
}
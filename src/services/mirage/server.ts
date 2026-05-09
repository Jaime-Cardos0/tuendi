// src/services/mirage/server.ts
import { createServer, Server, Response, RestSerializer } from "miragejs";
import {
  userModel, motoqueiroModel, veiculoModel, uploadModel,
  pedidoModel, avaliacaoModel, carteiraModel, transacaoModel,
  notificacaoModel, suporteModel,
  subscricaoModel,
} from "./models";
import {
  userFactory, motoqueiroFactory, veiculoFactory, uploadFactory,
  pedidoFactory, avaliacaoFactory, carteiraFactory, transacaoFactory,
  notificacaoFactory, suporteFactory,
  subscricaoFactory,
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
      subscricao: subscricaoModel,
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
      subscricao: subscricaoFactory,
    },

    serializers: {
      application: RestSerializer.extend({
        include: ["user"],
        embed: true,
      }),
    },

    seeds,

    routes() {
      this.namespace = "api";

      // Users
      this.get("/users", (schema, request) => {
        const { page, perPage }: { page?: string; perPage?: string } = request.queryParams;

        const total = schema.all("user").length;
        const pageNum = parseInt(page!) || 1;
        const perPageNum = parseInt(perPage!) || 10;
        const start = (pageNum - 1) * perPageNum;
        const end = start + perPageNum;

        const users = schema.all("user").models.map((u) => u.attrs).slice(start, end);

        return new Response(200, { "x-total-count": String(total) }, users);
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
        user.update(attrs);
        return user.attrs;
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
        if (!m) return new Response(404, {}, { error: "Motoqueiro not found" });
        m.update(attrs);
        return m.attrs;
      });

      // Pedidos — devolve dados montados
      this.get("/pedidos", (schema) => {
        return schema.all("pedido").models.map((p) => {
          const cliente = p.cliente?.attrs ?? {};
          const motoqueiro = p.motoqueiro?.attrs ?? {};
          const userDataMotoqueiro = p.motoqueiro?.user?.attrs ?? {};
          return { ...p.attrs, cliente, motoqueiro, userDataMotoqueiro };
        });
      });

      this.get("/pedidos/:id", (schema, request) => {
        const p = schema.find("pedido", request.params.id);
        if (!p) return null;
        return { ...p.attrs, cliente: p.cliente?.attrs, motoqueiro: p.motoqueiro?.attrs, userDataMotoqueiro: p.motoqueiro?.user?.attrs };
      });

      this.patch("/pedidos/:id", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const pedido = schema.find("pedido", request.params.id);
        if (!pedido) return new Response(404, {}, { error: "Pedido not found" });
        pedido.update(attrs);
        return pedido.attrs;
      });

      // Carteiras
      this.get("/carteiras", (schema) => schema.all("carteira").models.map((c) => c.attrs));
      this.get("/carteiras/:id", (schema, request) => {
        const carteira = schema.find("carteira", request.params.id);
        if (!carteira) return new Response(404, {}, { error: "Carteira not found" });
        return carteira.attrs;
      });

      // Transacoes
      this.get("/transacoes", (schema) => schema.all("transacao").models.map((t) => t.attrs));

      // Avaliacoes
      this.get("/avaliacoes", (schema) => schema.all("avaliacao").models.map((a) => a.attrs));

      // Notificacoes
      this.get("/notificacoes", (schema) => schema.all("notificacao").models.map((n) => n.attrs));
      this.patch("/notificacoes/:id", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const notificacao = schema.find("notificacao", request.params.id);
        if (!notificacao) return new Response(404, {}, { error: "Notificação not found" });
        notificacao.update(attrs);
        return notificacao.attrs;
      });

      // Suportes
      this.get("/suportes", (schema) => schema.all("suporte").models.map((s) => s.attrs));
      this.patch("/suportes/:id", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const suporte = schema.find("suporte", request.params.id);
        if (!suporte) return new Response(404, {}, { error: "Suporte not found" });
        suporte.update(attrs);
        return suporte.attrs;
      });

      this.get("/subscricoes", (schema) => {
        return schema.all("subscricao").models.map((s) => {
        const motoqueiro = s.motoqueiro?.attrs ?? {};
        const user = s.motoqueiro?.user?.attrs ?? {};
        return { ...s.attrs, motoqueiro: { ...motoqueiro, user } };
      });
    });
    },
  });
}
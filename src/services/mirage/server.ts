import { createServer, Server, Response, RestSerializer } from "miragejs";
import {
  userModel, motoqueiroModel, veiculoModel, uploadModel,
  pedidoModel, avaliacaoModel, carteiraModel, transacaoModel,
  notificacaoModel, suporteModel,
  subscricaoModel,
  actividadeModel,
} from "./models";
import {
  userFactory, motoqueiroFactory, veiculoFactory, uploadFactory,
  pedidoFactory, avaliacaoFactory, carteiraFactory, transacaoFactory,
  notificacaoFactory, suporteFactory,
  subscricaoFactory,
  actividadeFactory,
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
      actividade: actividadeModel,
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
      actividade: actividadeFactory,
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
        const clientes  = schema.all("user").filter((u) => u.role === "cliente").length;
        const motoqueiroCount = schema.all("user").filter((u) => u.role === "motoqueiro").length;
        const suspensos = schema.all("user").filter((u) => u.status === "suspenso").length;

        const pageNum = parseInt(page!) || 1;
        const perPageNum = parseInt(perPage!) || 10;
        const start = (pageNum - 1) * perPageNum;
        const end = start + perPageNum;

        const users = schema.all("user").models.map((u) => u.attrs).slice(start, end);

        return new Response(200, { "x-total-count": JSON.stringify({total, clientes, motoqueiroCount, suspensos}) }, users);
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
      this.get("/motoqueiros", (schema, request) => {

        const total = schema.all("motoqueiro").length;
        const pendentes = schema.all("motoqueiro").filter(r => r.status === "pendente_aprovacao").length;
        const ativos = schema.all("motoqueiro").filter(r => r.status === "activo").length;
        const suspensos = schema.all("motoqueiro").filter(r => r.status === "suspenso").length;

        const { page, perPage }: { page?: string; perPage?: string } = request.queryParams;
        const pageNum = parseInt(page!) || 1;
        const perPageNum = parseInt(perPage!) || 10;
        const start = (pageNum - 1) * perPageNum;
        const end = start + perPageNum;

        const motoqueiros = schema.all("motoqueiro").models.map((m) => {
          const user = m.user?.attrs ?? {};
          const veiculo = m.veiculo?.attrs ?? {};
          const uploads = m.uploads?.models.map((u) => u.attrs) ?? [];
          return { ...m.attrs, user, veiculo, uploads };
        }).slice(start, end);

        return new Response(200, { "x-total-count": JSON.stringify({total, pendentes, ativos, suspensos}) }, motoqueiros);
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
      this.get("/pedidos", (schema, request) => {

        const total = schema.all("pedido").length;
        const emTransito = schema.all("pedido").filter((p) => p.status === "em_transito").length;
        const entregues  = schema.all("pedido").filter((p) => p.status === "entregue").length;
        const cancelados = schema.all("pedido").filter((p) => p.status === "cancelado").length;

        const { page, perPage }: { page?: string; perPage?: string } = request.queryParams;
        const pageNum = parseInt(page!) || 1;
        const perPageNum = parseInt(perPage!) || 10;
        const start = (pageNum - 1) * perPageNum;
        const end = start + perPageNum;

        const pedidos = schema.all("pedido").models.map((p) => {
          const cliente = p.cliente?.attrs ?? {};
          const motoqueiro = p.motoqueiro?.attrs ?? {};
          const userDataMotoqueiro = p.motoqueiro?.user?.attrs ?? {};
          return { ...p.attrs, cliente, motoqueiro, userDataMotoqueiro };
        }).slice(start, end);

        return new Response(200, { "x-total-count": JSON.stringify({total, emTransito, entregues, cancelados}) }, pedidos);
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

// rotas
    this.get("/actividades", (schema, request) => {
      const adminId = request.queryParams.adminId;
      const all = schema.all("actividade").models;
      if (adminId) {
        return all.filter((a) => a.attrs.adminId === adminId).map((a) => a.attrs);
      }
      return all.map((a) => a.attrs);
    });
    },
  });
}
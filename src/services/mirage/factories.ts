// src/services/mirage/factories.ts
import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";

export const userFactory = Factory.extend({
  firebaseUid() { return faker.string.uuid(); },
  nome() { return faker.person.firstName(); },
  sobrenome() { return faker.person.lastName(); },
  email() { return faker.internet.email(); },
  telefone() { return faker.phone.number(); },
  telefoneVerificado() { return faker.datatype.boolean(); },
  numeroDocumento() { return faker.string.alphanumeric(9).toUpperCase(); },
  tipoDocumento() { return "BI"; },
  fotoPerfil() { return faker.image.avatar(); },
  dataNascimento() { return faker.date.birthdate({ min: 18, max: 60, mode: "age" }).toISOString(); },
  role() { return "cliente"; },
  status() { return "activo"; },
  criadoEm() { return faker.date.recent({ days: 60 }).toISOString(); },
  atualizadoEm() { return faker.date.recent({ days: 10 }).toISOString(); },
});

export const motoqueiroFactory = Factory.extend({
  classificacaoMedia() { return parseFloat(faker.number.float({ min: 3, max: 5, fractionDigits: 2 }).toFixed(2)); },
  totalAvaliacoes() { return faker.number.int({ min: 0, max: 200 }); },
  statusDisponibilidade() {
    return faker.helpers.arrayElement(["online", "offline", "ocupado"]);
  },
  status() {
    return faker.helpers.arrayElement(["pendente_aprovacao", "activo", "suspenso"]);
  },
  morada() { return faker.location.streetAddress(); },
  aprovadoEm() { return faker.date.recent({ days: 30 }).toISOString(); },
  motivoRejeicao() { return null; },
  criadoEm() { return faker.date.recent({ days: 60 }).toISOString(); },
});

export const veiculoFactory = Factory.extend({
  marca() { return faker.helpers.arrayElement(["Honda", "Yamaha", "Suzuki", "Bajaj"]); },
  modelo() { return faker.vehicle.model(); },
  placa() { return faker.string.alphanumeric(6).toUpperCase(); },
  corPrincipal() { return faker.color.human(); },
  ano() { return faker.number.int({ min: 2010, max: 2024 }); },
  ativo() { return true; },
  criadoEm() { return faker.date.recent({ days: 60 }).toISOString(); },
});

export const uploadFactory = Factory.extend({
  tipo() {
    return faker.helpers.arrayElement([
      "documento_bi_frente",
      "documento_bi_verso",
      "documento_carta_frente",
      "documento_carta_verso",
      "foto_veiculo",
    ]);
  },
  nomeOriginal() { return faker.system.fileName(); },
  mimeType() { return "image/jpeg"; },
  tamanho() { return faker.number.int({ min: 100000, max: 5000000 }); },
  status() { return "pendente"; },
  motivoRejeicao() { return null; },
  url() { return faker.image.url(); },
  criadoEm() { return faker.date.recent({ days: 30 }).toISOString(); },
});

export const pedidoFactory = Factory.extend({
  numeroPedido() { return `PED-${faker.string.alphanumeric(8).toUpperCase()}`; },
  status() {
    return faker.helpers.arrayElement([
      "pendente", "a_procurar_motoqueiro", "motoqueiro_atribuido",
      "recolhido", "em_transito", "entregue", "cancelado",
    ]);
  },
  origemEndereco() { return faker.location.streetAddress(); },
  origemLatitude() { return parseFloat(faker.location.latitude().toString()); },
  origemLongitude() { return parseFloat(faker.location.longitude().toString()); },
  destinoEndereco() { return faker.location.streetAddress(); },
  destinoLatitude() { return parseFloat(faker.location.latitude().toString()); },
  destinoLongitude() { return parseFloat(faker.location.longitude().toString()); },
  descricaoEncomenda() { return faker.commerce.productName(); },
  fragil() { return faker.datatype.boolean(); },
  valorEntrega() { return parseFloat(faker.number.float({ min: 500, max: 5000, fractionDigits: 2 }).toFixed(2)); },
  distanciaKm() { return parseFloat(faker.number.float({ min: 1, max: 30, fractionDigits: 2 }).toFixed(2)); },
  metodoPagamento() { return faker.helpers.arrayElement(["dinheiro", "stripe"]); },
  motivoCancelamento() { return null; },
  criadoEm() { return faker.date.recent({ days: 30 }).toISOString(); },
  entregueEm() { return null; },
  canceladoEm() { return null; },
});

export const avaliacaoFactory = Factory.extend({
  notaCliente() { return faker.number.int({ min: 1, max: 5 }); },
  comentarioCliente() { return faker.lorem.sentence(); },
  notaMotoqueiro() { return faker.number.int({ min: 1, max: 5 }); },
  comentarioMotoqueiro() { return faker.lorem.sentence(); },
  criadoEm() { return faker.date.recent({ days: 30 }).toISOString(); },
});

export const carteiraFactory = Factory.extend({
  saldo() { return parseFloat(faker.number.float({ min: 0, max: 50000, fractionDigits: 2 }).toFixed(2)); },
  criadoEm() { return faker.date.recent({ days: 60 }).toISOString(); },
});

export const transacaoFactory = Factory.extend({
  tipo() { return faker.helpers.arrayElement(["credito", "debito"]); },
  valor() { return parseFloat(faker.number.float({ min: 100, max: 5000, fractionDigits: 2 }).toFixed(2)); },
  descricao() { return faker.helpers.arrayElement(["Pagamento de entrega", "Recarga de carteira", "Comissão"]); },
  saldoAnterior() { return parseFloat(faker.number.float({ min: 0, max: 50000, fractionDigits: 2 }).toFixed(2)); },
  saldoAtual() { return parseFloat(faker.number.float({ min: 0, max: 50000, fractionDigits: 2 }).toFixed(2)); },
  criadoEm() { return faker.date.recent({ days: 30 }).toISOString(); },
});

export const notificacaoFactory = Factory.extend({
  tipo() {
    return faker.helpers.arrayElement([
      "pedido_criado", "pedido_aceite", "pedido_entregue", "pagamento", "sistema",
    ]);
  },
  titulo() { return faker.lorem.words(3); },
  mensagem() { return faker.lorem.sentence(); },
  lida() { return faker.datatype.boolean(); },
  criadoEm() { return faker.date.recent({ days: 7 }).toISOString(); },
});

export const suporteFactory = Factory.extend({
  titulo() { return faker.lorem.words(5); },
  descricao() { return faker.lorem.paragraph(); },
  status() { return faker.helpers.arrayElement(["aberto", "em_analise", "resolvido"]); },
  resposta() { return null; },
  respondidoPor() { return null; },
  criadoEm() { return faker.date.recent({ days: 30 }).toISOString(); },
  resolvidoEm() { return null; },
});
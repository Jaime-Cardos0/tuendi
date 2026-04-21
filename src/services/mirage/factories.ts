import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";

export const UserFactory = Factory.extend({
  nome() {
    return faker.person.fullName();
  },

  email() {
    return faker.internet.email();
  },

  telefone() {
    return faker.phone.number();
  },

  firebaseUid() {
    return faker.string.uuid();
  },

  role() {
    return faker.helpers.arrayElement([
      "CLIENT",
      "MOTOQUEIRO",
    ]);
  },
});

export const PedidoFactory = Factory.extend({
  origem() {
    return faker.location.streetAddress();
  },

  destino() {
    return faker.location.streetAddress();
  },

  preco() {
    return faker.number.int({ min: 10, max: 100 });
  },

  status() {
    return faker.helpers.arrayElement([
      "PENDENTE",
      "ACEITO",
      "ENTREGUE",
    ]);
  },
});

export const PagamentoFactory = Factory.extend({
  metodo: "CARTEIRA",

  valor() {
    return faker.number.int({ min: 10, max: 100 });
  },
});

export const MensagemFactory = Factory.extend({
  mensagem() {
    return faker.lorem.sentence();
  },
});
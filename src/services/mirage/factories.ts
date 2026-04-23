import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";

export const userFactory = Factory.extend({
  name() {
    return faker.person.fullName();
  },

  email() {
    return faker.internet.email();
  },

  telephone() {
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

  createdAt(){
    return faker.date.recent({days: 10});
  }
});

export const orderFactory = Factory.extend({
  origin() {
    return faker.location.streetAddress();
  },

  destination() {
    return faker.location.streetAddress();
  },

  price() {
    return faker.number.int({ min: 10, max: 100 });
  },

  status() {
    return faker.helpers.arrayElement([
      "PENDENTE",
      "ACEITO",
      "ENTREGUE",
    ]);
  },

  description(){
    return faker.lorem.paragraph();
  }
});

export const paymentFactory = Factory.extend({
  metodo: "CARTEIRA",

  createdAt(){
    return faker.number.int({min: 1, max: 24});
  },

  value() {
    return faker.number.int({ min: 10, max: 100 });
  },
});

export const riderFactory = Factory.extend({
  createdAt(){
    return faker.date.recent({days: 10});
  }
});

export const transactionFactory = Factory.extend({
  value() {
    return faker.number.int({ min: 10, max: 100 });
  },

  description(){
    return faker.lorem.paragraph();
  },

  createdAt(){
    return faker.number.int({min: 1, max: 24});
  },

});

export const locationFactory = Factory.extend({
  latitude(){
    return faker.location.latitude({precision: 3});
  },
  
  longitude(){
    return faker.location.longitude({precision: 3});
  }
});

export const walletFactory = Factory.extend({
  balance(){
    return faker.number.int({min: 50, max: 2000})
  }
});
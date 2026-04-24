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
    return faker.phone.number({ style: 'national'});
  },

  firebaseUid() {
    return faker.internet.jwtAlgorithm();
  },

  role() {
    return faker.helpers.arrayElement([
      "CLIENTE",
      "ENTREGADOR",
    ]);
  },

  createdAt(){
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(faker.date.recent({ days: 10 }));
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
  firstName() { return faker.person.firstName(); },
  lastName() { return faker.person.lastName(); },
  email() { return faker.internet.email(); },
  birthDate() { return faker.date.birthdate({ min: 18, max: 50, mode: "age" }).toISOString(); },
  profilePhoto() { return faker.image.avatar(); },

  biNumber() { return faker.string.alphanumeric(9).toUpperCase(); },
  biFront() { return faker.image.url(); },
  biBack() { return faker.image.url(); },

  licenseNumber() { return faker.string.alphanumeric(8).toUpperCase(); },
  licenseFront() { return faker.image.url(); },
  licenseBack() { return faker.image.url(); },

  vehiclePhoto() { return faker.image.url(); },
  vehiclePlatePhoto() { return faker.image.url(); },
  vehicleBrand() { return faker.helpers.arrayElement(["Honda", "Yamaha", "Suzuki", "Bajaj"]); },
  vehicleModel() { return faker.vehicle.model(); },
  vehicleColor() { return faker.color.human(); },
  vehiclePlate() { return faker.string.alphanumeric(6).toUpperCase(); },

  status() {
    return faker.helpers.arrayElement(["PENDENTE", "APROVADO", "RECUSADO", "REVISAO"]);
  },

  createdAt() { return faker.date.recent({ days: 30 }).toISOString(); },
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
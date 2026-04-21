import { faker } from '@faker-js/faker';
import { Factory, Model, createServer } from "miragejs";

interface User {
    created_at: string,
    nome: string,
    email: string,
}

export function makeServer(){

    const server = createServer({
        models: {
            user: Model.extend<Partial<User>>({})
        },

        factories: {
            user: Factory.extend({
                name(){
                    return faker.person.fullName();
                },

                eMail(){
                    return faker.internet.email();
                },

                createdAt(){
                    return faker.date.recent({days: 90});
                },
            })
        },

        routes() {
            this.namespace = "api";

            this.get("/users");
            this.post("/users");
        },
    })

    return server;
}
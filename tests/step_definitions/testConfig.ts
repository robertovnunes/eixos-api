import server from "../../src/api/conf/server";
import routes from "../../src/api/routes";
import supertest from "supertest";

const app = server;

const PORT = process.env.PORT || 3000;

app.use(routes);

export { app, PORT };
import express, {Request, Response} from "express";

import server from "./conf/server";
import routes from './routes';

const app = server;

const PORT = 3000;

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

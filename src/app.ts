import express, {Request, Response} from "express";
import cors from 'cors';

import server from "./conf/server";
import routes from './routes';

const app = server;

const PORT = 3000;

const corsOptions = {
  origin: '*', // Permitir acesso de qualquer origem
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

app.use(cors(corsOptions));

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

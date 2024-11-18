import express, {Request, Response} from "express";
import server from "./conf/server";
import routes from './routes';

const app = server;

const PORT = 3000;

app.use(routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Bem-vindo à API Node.js com TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

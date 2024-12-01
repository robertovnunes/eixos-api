import express from 'express';
import cors from 'cors';


const server = express();

// Middleware para lidar com JSON
server.use(express.json());

// Middleware para lidar com formulários
server.use(express.urlencoded({ extended: false }));

// Middleware para CORS
const corsOptions = {
  origin: '*', // Permitir acesso de qualquer origem
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos permitidos
  //allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

server.use(cors(corsOptions));

export default server;

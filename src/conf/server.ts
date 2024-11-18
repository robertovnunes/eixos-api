import express from 'express';

const server = express();

// Middleware para lidar com JSON
server.use(express.json());

// Middleware para lidar com formulários
server.use(express.urlencoded({ extended: false }));

export default server;

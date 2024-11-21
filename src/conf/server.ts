import express from 'express';
import path from 'path';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig';

const server = express();

// Middleware para lidar com JSON
server.use(express.json());

// Middleware para lidar com formulários
server.use(express.urlencoded({ extended: false }));

// Middleware para lidar com CSS
server.use(
  '/customUI.css',
  express.static(path.join(__dirname, 'customUI.css')),
);

//Middleware para documentação usando Swagger
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        customSiteTitle: 'Minha API',
        customCssUrl: '/customUI.css'
    })
);

export default server;

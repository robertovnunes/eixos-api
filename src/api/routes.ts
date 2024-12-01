import Express, { Router } from 'express';
import express from 'express';
import TaskController from './controllers/task.controller';
import TaskService from './services/tasks.service';
import { injector } from './di/index';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './conf/swaggerConfig';
import path from 'path';

const router = Router();

const app = Express();

app.use(
  '/api',
  new TaskController(router, injector.getService(TaskService)).router,
);

// Middleware para lidar com CSS
app.use('/customUI.css', express.static(path.join(__dirname, 'customUI.css')));

//Middleware para documentação usando Swagger
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'Eixos API',
    customCssUrl: '/customUI.css',
  }),
);

export default app;

import Express, { Router } from 'express';
import TaskController from "./controllers/task.controller";
import TaskService from "./services/tasks.service";
import {injector} from './di/index';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './conf/swaggerConfig';

const router = Router();

const app = Express();

app.use('/api', new TaskController(
        router, 
        injector.getService(TaskService)).router
    );
    
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
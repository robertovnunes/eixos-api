import Express, { Router } from 'express';

import { injector } from './di/index';

import TaskController from './controllers/task.controller';
import TaskService from './services/tasks.service';
import TimerController from './controllers/timer.controller';
import TimerService from './services/timer.service';



const router = Router();

const app = Express();

app.use(
  '/api',
  [new TaskController(router, injector.getService(TaskService)).router, new TimerController(router, injector.getService(TimerService)).router],
);


export default app;

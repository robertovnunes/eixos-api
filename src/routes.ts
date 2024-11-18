import { Express, Router } from "express";
import TaskController from "./controllers/task.controller";
import TaskService from "./services/tasks.service";
import {injector} from './di/index';

const router = Router();

export default (app: Express) => {
    app.use('/api', new TaskController(
        router, 
        injector.getService(TaskService)).router
    );
};
import e, { Router } from "express";
import { TaskController } from "./controllers/task.controller";

const routes = Router();

const taskController = new TaskController();


routes.use('/tasks', taskController.router);

export default routes;
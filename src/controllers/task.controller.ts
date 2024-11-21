import { Router, Request, Response } from 'express';
import TasksService from '../services/tasks.service';
import TaskEntity from '../entities/task.entity';

// Toda documentação está escrita em ./src/conf/swaggerDoc.yaml

class TaskController {
  private prefix: string = '/tasks';
  public router: Router;
  private taskService: TasksService;

  constructor(router: Router, taskService: TasksService) {
    this.router = router;
    this.taskService = taskService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) => {
      this.getAllTasks(req, res);
    });
    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) => {
      this.getTaskById(req, res);
    });
    this.router.post(this.prefix, (req: Request, res: Response) => {
      this.createTask(req, res);
    });
    this.router.patch(`${this.prefix}/:id`, (req: Request, res: Response) => {
      this.updateTask(req, res);
    });
    this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) => {
      this.deleteTask(req, res);
    });
  }

  private getAllTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await this.taskService.findAll();
      if (tasks.length === 0) {
        console.error('/GET 204 Empty list');
        res
          .status(204)
          .send({ messageCode: 204, message: 'No tasks in database' });
      } else {
        console.log('/GET 200 OK');
        res.status(200).send(tasks);
      }
    } catch (error) {
      console.error('/GET 404 not found');
      res.status(404).send({ messageCode: 404, message: 'Tasks not found' });
    }
  };

  private getTaskById = async (req: Request, res: Response) => {
    try {
      const task = await this.taskService.findById(req.params.id);
      if (!task) {
        console.error('/GET 404 not found');
        res
          .status(404)
          .send({ messageCode: 'not-found', message: 'Task not found' });
      } else {
        console.log('/GET 200 OK');
        res.status(200).send(task);
      }
    } catch (error) {
      console.error('/GET 500 ' + error);
      res
        .status(500)
        .send({ messageCode: 500, message: 'Internal server error' });
    }
  };

  private createTask = async (req: Request, res: Response) => {
    try {
      let missingFields: string[] = [];
      if (!req.body.title) missingFields.push('title');
      if (!req.body.description) missingFields.push('description');
      if (!req.body.completed) missingFields.push('completed');
      if (!req.body.priority) missingFields.push('priority');
      if (!req.body.deadline) missingFields.push('deadline');
      if (missingFields.length > 0) {
        console.error('/POST 400 Bad request (missing fields)');
        res.status(400).send({
          messageCode: 'missing-fields',
          message: 'Missing fields: ' + missingFields.join(', '),
        });
      } else {
        const task = await this.taskService.create(req.body as TaskEntity);
        console.log('/POST 201 Created');
        res.status(201).send(task);
      }
    } catch (error) {
      console.error('/POST 500 ' + error);
      res
        .status(500)
        .send({ messageCode: 500, message: 'Internal server error' });
    }
  };

  private updateTask = async (req: Request, res: Response) => {
    try {
      const task = await this.taskService.update(
        req.params.id,
        req.body as Partial<TaskEntity>,
      );
      if (!task) {
        console.error('/PATCH 404 not found');
        res
          .status(404)
          .send({ messageCode: 'not-found', message: 'Task not found' });
      } else {
        console.log('/PATCH 202 OK');
        res.status(202).send(task);
      }
    } catch (error) {
      console.error('/PATCH 500 ' + error);
      res
        .status(500)
        .send({ messageCode: 500, message: 'Internal server error' });
    }
  };

  private deleteTask = async (req: Request, res: Response) => {
    try {
      const result = await this.taskService.delete(req.params.id);
      if (!result) {
        console.error('/DELETE 404 not found');
        res
          .status(404)
          .send({ messageCode: 'not-found', message: 'Task not found' });
      } else {
        console.log('/DELETE 200 OK');
        res
          .status(200)
          .send({ messageCode: 'success', message: 'Task deleted' });
      }
    } catch (error) {
      console.error('/DELETE 500 ' + error);
      res
        .status(500)
        .send({ messageCode: 500, message: 'Internal server error' });
    }
  };
}

export default TaskController;
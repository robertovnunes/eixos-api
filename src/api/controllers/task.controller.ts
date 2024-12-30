import { Router, Request, Response } from 'express';
import TasksService from '../services/tasks.service';
import TaskEntity from '../entities/task.entity';
import { Result, SuccessResult } from '../utils/result';
import { authenticateToken } from './autenticateToken';

// Toda documentação está escrita em ./src/conf/swaggerDoc.yaml

class TaskController {
  private prefix: string = '/tasks';
  public router: Router;
  private taskService: TasksService;
  private autenticateToken: any;

  constructor(router: Router, taskService: TasksService) {
    this.router = router;
    this.taskService = taskService;
    this.autenticateToken = authenticateToken;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, 
      this.autenticateToken,  
      (req: Request, res: Response) => {
        this.getAllTasks(req, res);
      }
    );
    this.router.get(
      `${this.prefix}/:id`,
      this.autenticateToken,
      (req: Request, res: Response) => {
        this.getTaskById(req, res);
      },
    );
    this.router.post(
      this.prefix,
      this.autenticateToken,
      (req: Request, res: Response) => {
        this.createTask(req, res);
      },
    );
    this.router.patch(
      `${this.prefix}/:id`,
      this.autenticateToken,
      (req: Request, res: Response) => {
        this.updateTask(req, res);
      },
    );
    this.router.delete(`${this.prefix}/:id`, this.autenticateToken,  (req: Request, res: Response) => {
      this.deleteTask(req, res);
    });
  }

  private getAllTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await this.taskService.getTasks();
      if (tasks.length === 0) {
        console.error('/GET/tasks 204 Empty list');
        res.status(204)
          .send({ messageCode: 'empty_list', message: 'No tasks in database' });
      } else {
        console.log('/GET/tasks 200 OK');
        res.status(200).send(tasks);
      }
    } catch (error) {
      console.error(`/GET 500 ${error}`);
      res.status(500).send({ messageCode: 'server_error', message: 'internal server error' });
    }
  };

  private getTaskById = async (req: Request, res: Response) => {
    try {
      const task = await this.taskService.getTaskById(req.params.id);
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
      if (!req.body.priority) missingFields.push('priority');
      if (missingFields.length > 0) {
        console.error('/POST 400 Bad request (missing fields)');
        res.status(400).send({
          messageCode: 'missing-fields',
          message: 'Missing fields: ' + missingFields.join(', '),
        });
      } else {
        const task = await this.taskService.createTask(req.body as Partial<TaskEntity>);
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
      const task = await this.taskService.updateTask(
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
      await this.taskService.deleteTask(req.params.id);
      
      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
      }).handle(res);

    } catch (error) {
      console.error('/DELETE 500 ' + error);
      res
        .status(500)
        .send({ messageCode: 500, message: 'Internal server error' });
    }
  };
}

export default TaskController;
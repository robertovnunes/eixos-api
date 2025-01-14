import { Router, Request, Response, NextFunction } from 'express';
import TasksService from '../services/tasks.service';
import TaskEntity from '../entities/task.entity';
import { Result, SuccessResult } from '../utils/result';
import jwt from 'jsonwebtoken';

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

  private generateAccessToken = (email: string) => {
    const JWT_SECRET = process.env.JWT || 'secret';
    const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || '15m';
    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });
    return token;
  }

  private async authenticateToken(req: Request, res: Response, next: NextFunction): Promise<any> {
    let isAuthenticated = false;
    const JWT_SECRET = process.env.JWT_SECRET || 'secret';
    const refreshToken = req.cookies['refresh_token'];
    if (refreshToken) {
      const isAuth = jwt.verify(refreshToken, JWT_SECRET);
      if (isAuth) {
        isAuthenticated = true;
      }
    }
    if (!isAuthenticated) {
      return res.status(403).send({ message: 'Token inválido.' });
    } else {
      const token = req.cookies['access_token'];
      
      if (!token) {
        const username = req.body.email;
        const newToken = this.generateAccessToken(username);
        res.cookie('access_token', newToken, {
            //httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 15 * 60 * 1000, // 15 minutos
          }).json({success: 'true', message: 'Token de acesso renovado' });
      }
  
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded; // Anexa os dados do usuário à requisição
        next();
      } catch (err) {
        return res.status(403).send({ message: 'Token inválido.' });
      }

    }
  }
  

  private initRoutes() {
    this.router.get(
      this.prefix,
      this.authenticateToken,
      (req: Request, res: Response) => {
        this.getAllTasks(req, res);
      },
    );
    this.router.get(
      `${this.prefix}/:id`,
      this.authenticateToken,
      (req: Request, res: Response) => {
        this.getTaskById(req, res);
      },
    );
    this.router.post(
      this.prefix,
      this.authenticateToken,
      (req: Request, res: Response) => {
        this.createTask(req, res);
      },
    );
    this.router.patch(
      `${this.prefix}/:id`,
      this.authenticateToken,
      (req: Request, res: Response) => {
        this.updateTask(req, res);
      },
    );
    this.router.delete(
      `${this.prefix}/:id`,
      this.authenticateToken,
      (req: Request, res: Response) => {
        this.deleteTask(req, res);
      },
    );
  }

  private getAllTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await this.taskService.getTasks();
      if (tasks.length === 0) {
        console.error('/GET/tasks 204 Empty list');
        res
          .status(204)
          .send({ messageCode: 'empty_list', message: 'No tasks in database' });
      } else {
        console.log('/GET/tasks 200 OK');
        res.status(200).send(tasks);
      }
    } catch (error) {
      console.error(`/GET 500 ${error}`);
      res
        .status(500)
        .send({
          messageCode: 'server_error',
          message: 'internal server error',
        });
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
        const task = await this.taskService.createTask(
          req.body as Partial<TaskEntity>,
        );
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
import { Router, Request, Response } from 'express';
import TasksService from '../services/tasks.service';
import TaskEntity from '../entities/task.entity';

class TaskController {
  private prefix: string = '/tasks';
  public router: Router;
  private taskService: TasksService;

  constructor(router: Router, taskService: TasksService) {
    this.router = router;
    this.taskService = taskService;
    this.initRoutes();
  }

  /**
   * @swagger
   * definitions:
   *   Task:
   *     type: object
   *     properties:
   *       id:
   *         type: string
   *         description: Task ID
   *         example: 1
   *       title:
   *         type: string
   *         description: Task title
   *         example: Task 1
   *       description:
   *         type: string
   *         description: Task description
   *         example: Task 1 description
   *       completed:
   *         type: boolean
   *         description: Task completion status
   *         example: false
   *       priority:
   *         type: string
   *         description: Task priority
   *         example: high
   *       deadline:
   *         type: string
   *         format: date
   *         description: Task deadline
   *         example: 2021-12-31
   *   newTask:
   *     type: object
   *     properties:
   *       title:
   *         type: string
   *         description: Task title
   *         example: Task 1
   *       description:
   *         type: string
   *         description: Task description
   *         example: Task 1 description
   *       completed:
   *         type: boolean
   *         description: Task completion status
   *         example: false
   *       priority:
   *         type: string
   *         description: Task priority
   *         example: high
   *       deadline:
   *         type: string
   *         format: date
   *         description: Task deadline
   *         example: 2021-12-31
   *
   * paths:
   *
   *   /api/tasks/{id}:
   *     get:
   *       summary: Retrieve a task by ID
   *       description: Fetch a task by its ID
   *       parameters:
   *        - in: path
   *          name: id
   *          schema:
   *           type: string
   *          required: true
   *          description: Task ID
   *       responses:
   *        200:
   *         description: A task
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/Task'
   *        404:
   *         description: Task not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  messageCode:
   *                    type: integer
   *                    description: 404
   *                    example: 404
   *                  message:
   *                    type: string
   *                    description: Task not found
   *                    example: Task not found
   *
   *   /api/tasks:
   *     get:
   *       summary: Retrieve all tasks
   *       description: Fetch a list of all tasks
   *       responses:
   *         200:
   *           description: A list of tasks
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   $ref: '#/definitions/Task'
   *     post:
   *       summary: Create a task
   *       description: Create a new task
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/newTask'
   *       responses:
   *         201:
   *          description: A task created
   *          content:
   *           application/json:
   *            schema:
   *             $ref: '#/definitions/Task'
   *
   *     patch:
   *       summary: Update a task
   *       description: Update a task by its ID
   *       parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *           required: true
   *           description: Task ID
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/newTask'
   *
   *
   *
   */

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
        res.status(404).send({ messageCode: 'not-found', message: 'Task not found' });
      } else {
        console.log('/GET 200 OK');
        res.status(200).send(task);
      }
    } catch (error) {
      console.error('/GET 500 ' + error);
      res.status(500).send({ messageCode: 500, message: 'Internal server error' });
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
        res.status(400).send({ messageCode: 'missing-fields', message: 'Missing fields: ' + missingFields.join(', ') });
      } else {
        const task = await this.taskService.create(req.body as TaskEntity);
        console.log('/POST 201 Created');
        res.status(201).send(task);
      }
      
    } catch (error) {
      console.error('/POST 500 ' + error);
      res.status(500).send({ messageCode: 500, message: 'Internal server error' });
    }
  };

  private updateTask = async (req: Request, res: Response) => {
    try {
      const task = await this.taskService.update(req.params.id, req.body as Partial<TaskEntity>);
      if (!task) {
        console.error('/PATCH 404 not found');
        res.status(404).send({ messageCode: 'not-found', message: 'Task not found' });
      } else {
        console.log('/PATCH 200 OK');
        res.status(200).send(task);
      }
    } catch (error) {
      console.error('/PATCH 500 ' + error);
      res.status(500).send({ messageCode: 500, message: 'Internal server error' });
    }
  };

  private deleteTask = async (req: Request, res: Response) => {
    try {
      const result = await this.taskService.delete(req.params.id);
      if (!result) {
        console.error('/DELETE 404 not found');
        res.status(404).send({ messageCode: 'not-found', message: 'Task not found' });
      } else {
        console.log('/DELETE 204 No content');
        res.status(204).send();
      }
    } catch (error) {
      console.error('/DELETE 500 ' + error);
      res.status(500).send({ messageCode: 500, message: 'Internal server error' });
    }
  };
}

export default TaskController;
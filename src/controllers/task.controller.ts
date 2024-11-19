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
   *   /tasks:
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
   * 
   *   /tasks/{id}:
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
    
    const tasks = await this.taskService.findAll();
    res.send(tasks);
  };

  private getTaskById = async (req: Request, res: Response) => {
    const task = await this.taskService.findById(req.params.id);
    res.send(task);
  };

  private createTask = async (req: Request, res: Response) => {
    const task = await this.taskService.create(new TaskEntity(req.body));
    res.send(task);
  };

  private updateTask = async (req: Request, res: Response) => {
    const task = await this.taskService.update(req.params.id, req.body);
    res.send(task);
  };

  private deleteTask = async (req: Request, res: Response) => {
    const task = await this.taskService.delete(req.params.id);
    res.send(task);
  };
}

export default TaskController;
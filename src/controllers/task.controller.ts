import { Router, Request, Response } from 'express';
import TasksService from '../services/tasks.service';
import TaskEntity from '../entities/task.entity';

class TaskController {
  private prefix: string = '/tasks';
  public router: Router;
  private testService: TasksService;

  constructor() {
    this.router = Router();
    this.testService = new TasksService();
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
        const tasks = await this.testService.findAll();
        res.send(tasks);
    }

    private getTaskById = async (req: Request, res: Response) => {
        const task = await this.testService.findById(req.params.id);
        res.send(task);
    }

    private createTask = async (req: Request, res: Response) => {
        const task = await this.testService.create(new TaskEntity(req.body));
        res.send(task);
    }

    private updateTask = async (req: Request, res: Response) => {
        const task = await this.testService.update(req.params.id, req.body);
        res.send(task);
    }

    private deleteTask = async (req: Request, res: Response) => {
        const task = await this.testService.delete(req.params.id);
        res.send(task);
    }
}

export { TaskController };
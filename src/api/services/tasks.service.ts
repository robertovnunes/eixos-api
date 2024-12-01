import TaskEntity from "../entities/task.entity";
import TaskModel from "../models/task.model";
import { HttpNotFoundError } from '../utils/errors/http.error';
import TasksRepository from '../repositories/tasks.repository';

class TasksService {
  private tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  async createTask(data: Partial<TaskEntity>): Promise<TaskEntity> {
    const task = await this.tasksRepository.create(data);
    return new TaskEntity(data);
  }

  async getTaskById(id: string): Promise<TaskEntity | null> {
    const task = await this.taskRepository.findById(id);
    return task ? new TaskEntity(task) : null;
  }

  async updateTask(
    id: string,
    data: Partial<TaskEntity>,
  ): Promise<TaskEntity | null> {
    const task = await this.taskRepository.update(id, data);
    return task ? new TaskEntity(task) : null;
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}

export default TasksService;
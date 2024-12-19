import TaskEntity from "../entities/task.entity";
import ITaskModel from "../models/task.model";
import { HttpNotFoundError } from '../utils/errors/http.error';
import TasksRepository from '../repositories/tasks.repository';

interface Subtask {
  description: string;
  completed: boolean;
}

class TasksService {
  private tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  /**
   * Converte um documento do Mongoose para a entidade TaskEntity.
   * @param taskModel - Documento retornado pelo Mongoose.
   * @returns Instância de TaskEntity.
   */
  private toEntity(taskModel: any): TaskEntity {
    return new TaskEntity({
      _id: taskModel._id, // Converte ObjectId para string.
      title: taskModel.title,
      description: taskModel.description,
      completed: taskModel.completed,
      priority: taskModel.priority,
      deadline: taskModel.deadline,
      isImportant: taskModel.isImportant,
      isUrgent: taskModel.isUrgent,
      subtasks: taskModel.subtasks,
    });
  }

  async getTasks(): Promise<TaskEntity[]> {
    const tasks = await this.tasksRepository.findAll();
    return tasks.map((task) => this.toEntity(task));
  }

  async createTask(data: Partial<TaskEntity>): Promise<TaskEntity> {
    const task = await this.tasksRepository.create(data);
    return this.toEntity(task);
  }

  async getTaskById(id: string): Promise<TaskEntity | null> {
    const task = await this.tasksRepository.findById(id);
    return task ? this.toEntity(task) : null;
  }

  async updateTask(
    id: string,
    data: Partial<TaskEntity>,
  ): Promise<TaskEntity | null> {
    const task = await this.tasksRepository.update(id, data);
    return task ? this.toEntity(task) : null;
  }

  async deleteTask(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}

export default TasksService;
import TaskEntity from "../entities/task.entity";
import BaseRepository from "./base.repository";

export default class TasksRepository extends BaseRepository<TaskEntity> {

  constructor() {
    super('tasks');
  }

    async findAll(): Promise<TaskEntity[]> {
        return await this.findAll();
    }

    async findById(id: string): Promise<TaskEntity | null> {
        return await this.findById(id);
    }

    async create(task: TaskEntity): Promise<TaskEntity> {
        return await this.create(task);
    }

    async update(id: string, updatedTask: Partial<TaskEntity>): Promise<TaskEntity> {
        return await this.update(id, updatedTask);
    }

    async delete(id: string): Promise<boolean> {
        return await this.delete(id);
    }
}
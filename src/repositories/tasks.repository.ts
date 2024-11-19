import TaskEntity from "../entities/task.entity";
import BaseRepository from "./base.repository";

export default class TasksRepository extends BaseRepository<TaskEntity> {

  constructor() {
    super('tasks');
  }

    async findAll(): Promise<TaskEntity[]> {
        return await super.findAll();
    }

    async findById(id: string): Promise<TaskEntity | null> {
        return await super.findById(id);
    }

    async create(task: TaskEntity): Promise<TaskEntity> {
        return await super.create(task);
    }

    async update(id: string, updatedTask: Partial<TaskEntity>): Promise<TaskEntity | null> {
        return await super.update(id, updatedTask);
    }

    async delete(id: string): Promise<boolean> {
        return await super.delete(id);
    }
}
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
        return await super.findOne((item) => item.id === id);
    }

    async create(task: TaskEntity): Promise<TaskEntity> {
        return await super.add(task);
    }

    async updateTask(id: string, updatedTask: Partial<TaskEntity>): Promise<TaskEntity | null> {
        return await super.update((item) => item.id === id, updatedTask);
    }

    async deleteTask(id: string): Promise<void> {
        await super.delete((item) => item.id !== id);
    }
}
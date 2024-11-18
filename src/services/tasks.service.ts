import TaskEntity from "../entities/task.entity";
import TaskModel from "../models/task.model";
import { HttpNotFoundError } from '../utils/errors/http.error';
import TasksRepository from '../repositories/tasks.repository';

class TasksService {
    
    private tasksRepository: TasksRepository;

    constructor() {
        this.tasksRepository = new TasksRepository();
    }

    async findAll(): Promise<TaskModel[]> {
        const TaskEntity = await this.tasksRepository.findAll();
        return TaskEntity.map(task => new TaskModel(task));
    }

    async findById(id: string): Promise<TaskModel | null> {
        const task = await this.tasksRepository.findById(id);
        if (!task) {
            throw new HttpNotFoundError({msg:'Task not found', msgCode: 'task-not-found'});
        }
        return new TaskModel(task);
    }

    async create(task: TaskModel): Promise<TaskModel> {
        const newTask = await this.tasksRepository.create(new TaskEntity(task));
        return new TaskModel(newTask);
    }

    async update(id: string, updatedTask: Partial<TaskModel>): Promise<TaskModel | null> {
        const task = await this.findById(id);
        if (!task) {
            throw new HttpNotFoundError({msg:'Task not found', msgCode: 'task-not-found'});
        }
        const updatedTaskEntity = await this.tasksRepository.update(id, updatedTask);
        return new TaskModel(updatedTaskEntity);
    }

    async delete(id: string): Promise<boolean> {
        const task = await this.findById(id);
        if (!task) {
            throw new HttpNotFoundError({msg:'Task not found', msgCode: 'task-not-found'});
        }
        return await this.tasksRepository.delete(id);
    }
}

export default TasksService;
import TaskModel, {ITaskModel} from "../models/task.model";
import BaseRepository from "./base.repository";

export default class TasksRepository extends BaseRepository<ITaskModel> {
  constructor() {
    const taskModel = new TaskModel().model;
    super(taskModel);
  }

  /**
   * Busca todas as tarefas que estão marcadas como concluídas.
   * @returns Lista de tarefas concluídas.
   */
  async findCompletedTasks(): Promise<ITaskModel[]> {
    return this.model.find({ completed: true }).exec();
  }

  /**
   * Busca tarefas com base na prioridade fornecida.
   * @param priority - A prioridade a ser filtrada (Ex: 'Alta', 'Média').
   * @returns Lista de tarefas com a prioridade fornecida.
   */
  async findTasksByPriority(priority: string): Promise<ITaskModel[]> {
    return this.model.find({ priority }).exec();
  }

  /**
   * Busca tarefas cujo prazo (deadline) já passou.
   * @returns Lista de tarefas com prazos vencidos.
   */
  async findOverdueTasks(): Promise<ITaskModel[]> {
    const currentDate = new Date().toISOString();
    return this.model.find({ deadline: { $lt: currentDate } }).exec();
  }

  /**
   * Busca todas as tarefas com título parcialmente correspondente ao termo fornecido.
   * @param term - Parte do título a ser pesquisada.
   * @returns Lista de tarefas que correspondem ao termo.
   */
  async findTasksByTitle(term: string): Promise<ITaskModel[]> {
    const regex = new RegExp(term, 'i'); // Busca case-insensitive.
    return this.model.find({ title: { $regex: regex } }).exec();
  }
}
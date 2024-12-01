"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_model_1 = __importDefault(require("../models/task.model"));
const base_repository_1 = __importDefault(require("./base.repository"));
const database_1 = __importDefault(require("../conf/database"));
class TasksRepository extends base_repository_1.default {
    constructor() {
        const taskModel = new task_model_1.default().model;
        super(taskModel);
    }
    /**
     * Busca todas as tarefas que estão marcadas como concluídas.
     * @returns Lista de tarefas concluídas.
     */
    findCompletedTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.getInstance(); // Garantir que o banco está conectado
            return this.model.find({ completed: true }).exec();
        });
    }
    /**
     * Busca tarefas com base na prioridade fornecida.
     * @param priority - A prioridade a ser filtrada (Ex: 'Alta', 'Média').
     * @returns Lista de tarefas com a prioridade fornecida.
     */
    findTasksByPriority(priority) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.getInstance();
            return this.model.find({ priority }).exec();
        });
    }
    /**
     * Busca tarefas cujo prazo (deadline) já passou.
     * @returns Lista de tarefas com prazos vencidos.
     */
    findOverdueTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.getInstance();
            const currentDate = new Date().toISOString();
            return this.model.find({ deadline: { $lt: currentDate } }).exec();
        });
    }
    /**
     * Busca todas as tarefas com título parcialmente correspondente ao termo fornecido.
     * @param term - Parte do título a ser pesquisada.
     * @returns Lista de tarefas que correspondem ao termo.
     */
    findTasksByTitle(term) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.getInstance();
            const regex = new RegExp(term, 'i'); // Busca case-insensitive
            return this.model.find({ title: { $regex: regex } }).exec();
        });
    }
}
exports.default = TasksRepository;

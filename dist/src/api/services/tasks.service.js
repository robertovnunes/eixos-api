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
const task_entity_1 = __importDefault(require("../entities/task.entity"));
class TasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    /**
     * Converte um documento do Mongoose para a entidade TaskEntity.
     * @param taskModel - Documento retornado pelo Mongoose.
     * @returns Instância de TaskEntity.
     */
    toEntity(taskModel) {
        return new task_entity_1.default({
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
    getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.tasksRepository.findAll();
            return tasks.map((task) => this.toEntity(task));
        });
    }
    createTask(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.tasksRepository.create(data);
            return this.toEntity(task);
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.tasksRepository.findById(id);
            return task ? this.toEntity(task) : null;
        });
    }
    updateTask(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.tasksRepository.update(id, data);
            return task ? this.toEntity(task) : null;
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tasksRepository.delete(id);
        });
    }
}
exports.default = TasksService;

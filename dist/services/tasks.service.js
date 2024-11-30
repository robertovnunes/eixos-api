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
const task_model_1 = __importDefault(require("../models/task.model"));
const http_error_1 = require("../utils/errors/http.error");
class TasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const TaskEntity = yield this.tasksRepository.findAll();
            return TaskEntity.map(task => new task_model_1.default(task));
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.tasksRepository.findById(id);
            if (!task) {
                throw new http_error_1.HttpNotFoundError({ msg: 'Task not found', msgCode: 'task-not-found' });
            }
            return new task_model_1.default(task);
        });
    }
    create(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTask = yield this.tasksRepository.create(new task_entity_1.default(task));
            return new task_model_1.default(newTask);
        });
    }
    update(id, updatedTask) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.findById(id);
            if (!task) {
                throw new http_error_1.HttpNotFoundError({ msg: 'Task not found', msgCode: 'task-not-found' });
            }
            const updatedTaskEntity = yield this.tasksRepository.update(id, updatedTask);
            return updatedTaskEntity !== null ? new task_model_1.default(updatedTaskEntity) : null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.findById(id);
            if (!task) {
                throw new http_error_1.HttpNotFoundError({ msg: 'Task not found', msgCode: 'task-not-found' });
            }
            return yield this.tasksRepository.delete(id);
        });
    }
}
exports.default = TasksService;

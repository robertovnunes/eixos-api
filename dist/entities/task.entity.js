"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = __importDefault(require("./base.entity"));
class TaskEntity extends base_entity_1.default {
    constructor(task) {
        super(task.id || '');
        this.title = task.title;
        this.description = task.description;
        this.completed = task.completed;
        this.priority = task.priority;
        this.deadline = task.deadline;
    }
}
exports.default = TaskEntity;

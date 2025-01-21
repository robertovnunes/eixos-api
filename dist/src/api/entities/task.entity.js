"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = __importDefault(require("./base.entity"));
class TaskEntity extends base_entity_1.default {
    constructor(data) {
        super(data);
        this.title = data.title || '';
        this.description = data.description || '';
        this.completed = data.completed || false;
        this.priority = data.priority || { value: 0, label: 'Baixa' };
        this.deadline = data.deadline || '';
        this.isImportant = data.isImportant || false;
        this.isUrgent = data.isUrgent || false;
        this.subtasks = data.subtasks || [];
    }
}
exports.default = TaskEntity;

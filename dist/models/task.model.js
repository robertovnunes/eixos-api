"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = __importDefault(require("./base.model"));
class TaskModel extends base_model_1.default {
    constructor(data) {
        super(data.id || '');
        this.title = data.title;
        this.description = data.description;
        this.completed = false;
        this.priority = data.priority;
        this.deadline = data.deadline;
    }
}
exports.default = TaskModel;

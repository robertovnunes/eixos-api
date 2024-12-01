"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = __importDefault(require("./base.model"));
class TaskModel extends base_model_1.default {
    constructor() {
        super('Task', {
            title: { type: String, required: true },
            description: { type: String, required: true },
            completed: { type: Boolean, default: false },
            priority: { type: String, required: true },
            deadline: { type: String, required: false },
        });
    }
}
exports.default = TaskModel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const base_model_1 = __importDefault(require("./base.model"));
class TaskModel extends base_model_1.default {
    constructor() {
        super('Task', {
            _id: { type: mongoose_1.Types.ObjectId, auto: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            completed: { type: Boolean, default: false },
            priority: { type: Object, required: true },
            deadline: { type: String, required: false },
            isImportant: { type: Boolean, default: false },
            isUrgent: { type: Boolean, default: false },
            subtasks: { type: Array, default: [] },
        });
    }
}
exports.default = TaskModel;

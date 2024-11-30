"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_entity_1 = __importDefault(require("../entities/task.entity"));
class Database {
    constructor() {
        this.data = {};
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    static reset() {
        Database.instance = new Database();
    }
    static seed() {
        const db = Database.getInstance();
        db.data = {
            tasks: [
                new task_entity_1.default({
                    id: '1',
                    title: 'Estudar Node.js',
                    description: 'Estudar Node.js',
                    completed: false,
                    priority: 'low',
                    deadline: '2021-09-01'
                }),
                new task_entity_1.default({
                    id: '2',
                    title: 'Estudar TypeScript',
                    description: 'Estudar TypeScript',
                    completed: false,
                    priority: 'low',
                    deadline: '2021-09-01'
                }),
                new task_entity_1.default({
                    id: '3',
                    title: 'Estudar Nest.js',
                    description: 'Estudar Nest.js',
                    completed: false,
                    priority: 'low',
                    deadline: '2021-09-01'
                }),
            ],
        };
    }
}
exports.default = Database;

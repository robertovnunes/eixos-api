"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.injector = void 0;
const tasks_repository_1 = __importDefault(require("../repositories/tasks.repository"));
const tasks_service_1 = __importDefault(require("../services/tasks.service"));
const injector_1 = __importDefault(require("./injector"));
exports.injector = new injector_1.default();
exports.injector.registerRepository(tasks_repository_1.default, new tasks_repository_1.default());
exports.injector.registerService(tasks_service_1.default, new tasks_service_1.default(exports.injector.getRepository(tasks_repository_1.default)));

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const index_1 = require("./di/index");
const task_controller_1 = __importDefault(require("./controllers/task.controller"));
const tasks_service_1 = __importDefault(require("./services/tasks.service"));
const timer_controller_1 = __importDefault(require("./controllers/timer.controller"));
const timer_service_1 = __importDefault(require("./services/timer.service"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const user_service_1 = __importDefault(require("./services/user.service"));
const login_controller_1 = __importDefault(require("./controllers/login.controller"));
const router = (0, express_1.Router)();
const app = (0, express_1.default)();
app.use('/api', [
    new task_controller_1.default(router, index_1.injector.getService(tasks_service_1.default)).router,
    new timer_controller_1.default(router, index_1.injector.getService(timer_service_1.default)).router,
    new user_controller_1.default(router, index_1.injector.getService(user_service_1.default)).router,
    new login_controller_1.default(router, index_1.injector.getService(user_service_1.default)).router,
]);
exports.default = app;

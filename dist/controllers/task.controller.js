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
Object.defineProperty(exports, "__esModule", { value: true });
// Toda documentação está escrita em ./src/conf/swaggerDoc.yaml
class TaskController {
    constructor(router, taskService) {
        this.prefix = '/tasks';
        this.getAllTasks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.taskService.findAll();
                if (tasks.length === 0) {
                    console.error('/GET 204 Empty list');
                    res
                        .status(204)
                        .send({ messageCode: 204, message: 'No tasks in database' });
                }
                else {
                    console.log('/GET 200 OK');
                    res.status(200).send(tasks);
                }
            }
            catch (error) {
                console.error('/GET 404 not found');
                res.status(404).send({ messageCode: 404, message: 'Tasks not found' });
            }
        });
        this.getTaskById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskService.findById(req.params.id);
                if (!task) {
                    console.error('/GET 404 not found');
                    res
                        .status(404)
                        .send({ messageCode: 'not-found', message: 'Task not found' });
                }
                else {
                    console.log('/GET 200 OK');
                    res.status(200).send(task);
                }
            }
            catch (error) {
                console.error('/GET 500 ' + error);
                res
                    .status(500)
                    .send({ messageCode: 500, message: 'Internal server error' });
            }
        });
        this.createTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let missingFields = [];
                if (!req.body.title)
                    missingFields.push('title');
                if (!req.body.description)
                    missingFields.push('description');
                if (!req.body.priority)
                    missingFields.push('priority');
                if (!req.body.deadline)
                    missingFields.push('deadline');
                if (missingFields.length > 0) {
                    console.error('/POST 400 Bad request (missing fields)');
                    res.status(400).send({
                        messageCode: 'missing-fields',
                        message: 'Missing fields: ' + missingFields.join(', '),
                    });
                }
                else {
                    const task = yield this.taskService.create(req.body);
                    console.log('/POST 201 Created');
                    res.status(201).send(task);
                }
            }
            catch (error) {
                console.error('/POST 500 ' + error);
                res
                    .status(500)
                    .send({ messageCode: 500, message: 'Internal server error' });
            }
        });
        this.updateTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskService.update(req.params.id, req.body);
                if (!task) {
                    console.error('/PATCH 404 not found');
                    res
                        .status(404)
                        .send({ messageCode: 'not-found', message: 'Task not found' });
                }
                else {
                    console.log('/PATCH 202 OK');
                    res.status(202).send(task);
                }
            }
            catch (error) {
                console.error('/PATCH 500 ' + error);
                res
                    .status(500)
                    .send({ messageCode: 500, message: 'Internal server error' });
            }
        });
        this.deleteTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.taskService.delete(req.params.id);
                if (!result) {
                    console.error('/DELETE 404 not found');
                    res
                        .status(404)
                        .send({ messageCode: 'not-found', message: 'Task not found' });
                }
                else {
                    console.log('/DELETE 200 OK');
                    res
                        .status(200)
                        .send({ messageCode: 'success', message: 'Task deleted' });
                }
            }
            catch (error) {
                console.error('/DELETE 500 ' + error);
                res
                    .status(500)
                    .send({ messageCode: 500, message: 'Internal server error' });
            }
        });
        this.router = router;
        this.taskService = taskService;
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(this.prefix, (req, res) => {
            this.getAllTasks(req, res);
        });
        this.router.get(`${this.prefix}/:id`, (req, res) => {
            this.getTaskById(req, res);
        });
        this.router.post(this.prefix, (req, res) => {
            this.createTask(req, res);
        });
        this.router.patch(`${this.prefix}/:id`, (req, res) => {
            this.updateTask(req, res);
        });
        this.router.delete(`${this.prefix}/:id`, (req, res) => {
            this.deleteTask(req, res);
        });
    }
}
exports.default = TaskController;

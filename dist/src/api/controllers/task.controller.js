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
const result_1 = require("../utils/result");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Toda documentação está escrita em ./src/conf/swaggerDoc.yaml
class TaskController {
    constructor(router, taskService) {
        this.prefix = '/tasks';
        this.generateAccessToken = (email) => {
            const JWT_SECRET = process.env.JWT || 'secret';
            const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || '15m';
            const token = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, {
                expiresIn: ACCESS_TOKEN_EXPIRATION,
            });
            return token;
        };
        this.getAllTasks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.taskService.getTasks();
                if (tasks.length === 0) {
                    console.error('/GET/tasks 204 Empty list');
                    res
                        .status(204)
                        .send({ messageCode: 'empty_list', message: 'No tasks in database' });
                }
                else {
                    console.log('/GET/tasks 200 OK');
                    res.status(200).send(tasks);
                }
            }
            catch (error) {
                console.error(`/GET 500 ${error}`);
                res
                    .status(500)
                    .send({
                    messageCode: 'server_error',
                    message: 'internal server error',
                });
            }
        });
        this.getTaskById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskService.getTaskById(req.params.id);
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
                if (missingFields.length > 0) {
                    console.error('/POST 400 Bad request (missing fields)');
                    res.status(400).send({
                        messageCode: 'missing-fields',
                        message: 'Missing fields: ' + missingFields.join(', '),
                    });
                }
                else {
                    const task = yield this.taskService.createTask(req.body);
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
                const task = yield this.taskService.updateTask(req.params.id, req.body);
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
                yield this.taskService.deleteTask(req.params.id);
                return new result_1.SuccessResult({
                    msg: result_1.Result.transformRequestOnMsg(req),
                }).handle(res);
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
    authenticateToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let isAuthenticated = false;
            const JWT_SECRET = process.env.JWT_SECRET || 'secret';
            const refreshToken = req.cookies['refresh_token'];
            if (refreshToken) {
                const isAuth = jsonwebtoken_1.default.verify(refreshToken, JWT_SECRET);
                if (isAuth) {
                    isAuthenticated = true;
                }
            }
            if (!isAuthenticated) {
                return res.status(403).send({ message: 'Token inválido.' });
            }
            else {
                const token = req.cookies['access_token'];
                if (!token) {
                    const username = req.body.email;
                    const newToken = this.generateAccessToken(username);
                    res.cookie('access_token', newToken, {
                        //httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'none',
                        maxAge: 15 * 60 * 1000, // 15 minutos
                    }).json({ success: 'true', message: 'Token de acesso renovado' });
                }
                try {
                    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
                    req.user = decoded; // Anexa os dados do usuário à requisição
                    next();
                }
                catch (err) {
                    return res.status(403).send({ message: 'Token inválido.' });
                }
            }
        });
    }
    initRoutes() {
        this.router.get(this.prefix, this.authenticateToken, (req, res) => {
            this.getAllTasks(req, res);
        });
        this.router.get(`${this.prefix}/:id`, this.authenticateToken, (req, res) => {
            this.getTaskById(req, res);
        });
        this.router.post(this.prefix, this.authenticateToken, (req, res) => {
            this.createTask(req, res);
        });
        this.router.patch(`${this.prefix}/:id`, this.authenticateToken, (req, res) => {
            this.updateTask(req, res);
        });
        this.router.delete(`${this.prefix}/:id`, this.authenticateToken, (req, res) => {
            this.deleteTask(req, res);
        });
    }
}
exports.default = TaskController;

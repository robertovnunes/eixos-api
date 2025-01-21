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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Toda documentação está escrita em ./src/conf/swaggerDoc.yaml
class TimerController {
    constructor(router, timerService) {
        this.prefix = '/timers';
        this.authenticateToken = (token) => {
            const SECRET = process.env.JWT_SECRET || 'secret';
            if (!token) {
                return false;
            }
            try {
                jsonwebtoken_1.default.verify(token, SECRET);
                return true;
            }
            catch (err) {
                return false;
            }
        };
        this.getAllTimers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const timers = yield this.timerService.getTimers();
                if (timers.length === 0) {
                    console.error('/GET/timers 204 Empty list');
                    res.status(204).send({
                        messageCode: 'empty_list',
                        message: 'No timers in database',
                    });
                }
                else {
                    console.log('/GET/timers 200 OK');
                    res.status(200).send(timers);
                }
            }
            catch (error) {
                console.error(`/GET 500 ${error}`);
                res.status(500).send({
                    messageCode: 'server_error',
                    message: 'internal server error',
                });
            }
        });
        this.getTimerById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const timer = yield this.timerService.getTimerById(req.params.id);
                if (!timer) {
                    console.error('/GET 404 not found');
                    res
                        .status(404)
                        .send({ messageCode: 'not_found', message: 'Timer not found' });
                }
                else {
                    console.log('/GET 200 OK');
                    res.status(200).send(timer);
                }
            }
            catch (error) {
                console.error('/GET 500 ' + error);
                res.status(500).send({
                    messageCode: 'server_error',
                    message: 'internal server error',
                });
            }
        });
        this.createTimer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const timer = yield this.timerService.createTimer(req.body);
                console.log('/POST/timers 201 Created');
                res.status(201).send(timer);
            }
            catch (error) {
                console.error(`/POST/timers 500 ${error}`);
                res.status(500).send({
                    messageCode: 'server_error',
                    message: 'internal server error',
                });
            }
        });
        this.updateTimer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const timer = yield this.timerService.updateTimer(req.params.id, req.body);
                if (!timer) {
                    console.error('/PATCH/timers 404 not found');
                    res
                        .status(404)
                        .send({ messageCode: 'not_found', message: 'Timer not found' });
                }
                else {
                    console.log('/PATCH/timers 200 OK');
                    res.status(200).send(timer);
                }
            }
            catch (error) {
                console.error(`/PATCH/timers 500 ${error}`);
                res.status(500).send({
                    messageCode: 'server_error',
                    message: 'internal server error',
                });
            }
        });
        this.deleteTimer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.timerService.deleteTimer(req.params.id);
                console.log('/DELETE/timers 204 No content');
                res.status(204).send();
            }
            catch (error) {
                console.error(`/DELETE/timers 500 ${error}`);
                res.status(500).send({
                    messageCode: 'server_error',
                    message: 'internal server error',
                });
            }
        });
        this.router = router;
        this.timerService = timerService;
        this.initRoutes();
    }
    authToken(req, res, next) {
        const token = req.cookies['access_token'];
        const JWT_SECRET = process.env.JWT_SECRET || 'secret';
        if (!token) {
            return res.status(401).send({ message: 'Token ausente ou inválido.' });
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
    initRoutes() {
        this.router.get(this.prefix, this.authToken, (req, res) => {
            this.getAllTimers(req, res);
        });
        this.router.get(`${this.prefix}/:id`, this.authToken, (req, res) => {
            this.getTimerById(req, res);
        });
        this.router.post(this.prefix, this.authToken, (req, res) => {
            this.createTimer(req, res);
        });
        this.router.patch(`${this.prefix}/:id`, this.authToken, (req, res) => {
            this.updateTimer(req, res);
        });
        this.router.delete(`${this.prefix}/:id`, this.authToken, (req, res) => {
            this.deleteTimer(req, res);
        });
    }
}
exports.default = TimerController;

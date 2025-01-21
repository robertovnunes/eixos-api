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
const bcrypt_1 = __importDefault(require("bcrypt")); // Importando bcrypt para criptografia de senha
// Toda documentação está escrita em ./src/conf/swaggerDoc.yaml
class UserController {
    constructor(router, userService) {
        this.prefix = '/users'; // Prefixo para as rotas
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAllUsers();
                if (users.length === 0) {
                    console.error('/GET/users 204 Empty list');
                    res.status(204)
                        .send({ messageCode: 'empty_list', message: 'No users in database' });
                }
                else {
                    console.log('/GET/users 200 OK');
                    res.status(200).send(users);
                }
            }
            catch (error) {
                console.error(`/GET 500 ${error}`);
                res.status(500).send({ messageCode: 'server_error', message: 'internal server error' });
            }
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserById(req.params.id);
                if (!user) {
                    console.error('/GET 404 not found');
                    res
                        .status(404)
                        .send({ messageCode: 'not_found', message: 'User not found' });
                }
                else {
                    console.log('/GET 200 OK');
                    res.status(200).send(user);
                }
            }
            catch (error) {
                console.error(`/GET 500 ${error}`);
                res.status(500).send({ messageCode: 'server_error', message: 'internal server error' });
            }
        });
        this.getUserByEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserByEmail(req.params.email);
                if (!user) {
                    console.error('/GET 404 not found');
                    res
                        .status(404)
                        .send({ messageCode: 'not_found', message: 'User not found' });
                }
                else {
                    console.log('/GET 200 OK');
                    res.status(200).send(user);
                }
            }
            catch (error) {
                console.error(`/GET 500 ${error}`);
                res.status(500).send({ messageCode: 'server_error', message: 'internal server error' });
            }
        });
        this.getUserDefaultTimer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const defaultTimer = yield this.userService.getUserDefaultTimer(req.params.id);
                if (!defaultTimer) {
                    console.error('/GET 404 not found');
                    res
                        .status(404)
                        .send({ messageCode: 'not_found', message: 'User not found' });
                }
                else {
                    console.log('/GET 200 OK');
                    res.status(200).send(defaultTimer);
                }
            }
            catch (error) {
                console.error(`/GET 500 ${error}`);
                res.status(500).send({ messageCode: 'server_error', message: 'internal server error' });
            }
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, phone, defaultTimer, theme } = req.body;
                const userExists = yield this.userService.getUserByEmail(email);
                if (userExists) {
                    console.error('/POST 409 Conflict');
                    res.status(409).send({ messageCode: 'conflict', message: 'User already exists' });
                    return;
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const user = yield this.userService.createUser({ name, email, password: hashedPassword, phone, defaultTimer, theme });
                console.log('/POST 201 Created');
                res.status(201).send(user);
            }
            catch (error) {
                console.error(`/POST 500 ${error}`);
                res.status(500).send({ messageCode: 'server_error', message: 'internal server error' });
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.updateUser(req.params.id, req.body);
                if (!user) {
                    console.error('/PATCH 404 not found');
                    res
                        .status(404)
                        .send({ messageCode: 'not_found', message: 'User not found' });
                }
                else {
                    console.log('/PATCH 200 OK');
                    res.status(200).send(user);
                }
            }
            catch (error) {
                console.error(`/PATCH 500 ${error}`);
                res.status(500).send({ messageCode: 'server_error', message: 'internal server error' });
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userService.deleteUser(req.params.id);
                console.log('/DELETE 204 No content');
                res.status(204).send();
            }
            catch (error) {
                console.error(`/DELETE 500 ${error}`);
                res.status(500).send({ messageCode: 'server_error', message: 'internal server error' });
            }
        });
        this.router = router;
        this.userService = userService;
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(this.prefix, (req, res) => {
            this.getAllUsers(req, res);
        });
        this.router.get(`${this.prefix}/:id`, (req, res) => {
            this.getUserById(req, res);
        });
        this.router.get(`${this.prefix}/:email`, (req, res) => {
            this.getUserByEmail(req, res);
        });
        this.router.get(`${this.prefix}/:id/defaultTimer`, (req, res) => {
            this.getUserDefaultTimer(req, res);
        });
        this.router.post(this.prefix, (req, res) => {
            this.createUser(req, res);
        });
        this.router.patch(`${this.prefix}/:id`, (req, res) => {
            this.updateUser(req, res);
        });
        this.router.delete(`${this.prefix}/:id`, (req, res) => {
            this.deleteUser(req, res);
        });
    }
}
exports.default = UserController;

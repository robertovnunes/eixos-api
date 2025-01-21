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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginControler {
    constructor(router, userService) {
        this.prefix = '/login';
        this.generateAccessToken = (email) => {
            return jsonwebtoken_1.default.sign({ email }, this.SECRET, { expiresIn: '15m' });
        };
        this.generateRefreshToken = (email) => {
            return jsonwebtoken_1.default.sign({ email }, this.SECRET, { expiresIn: '7d' });
        };
        this.authenticateToken = (token) => {
            if (!token) {
                return { authenticate: false, message: 'Token não fornecido' };
            }
            try {
                jsonwebtoken_1.default.verify(token, this.SECRET);
                return { authenticate: true, message: 'Token autenticado' };
            }
            catch (err) {
                return { authenticate: false, message: 'Token inválido' };
            }
        };
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let access_token, refresh_token;
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    console.error('/POST 400 Bad Request');
                    res.status(400).send({
                        messageCode: 'bad_request',
                        message: 'Email and password are required',
                    });
                    return;
                }
                const user = yield this.userService.getUserByEmail(email);
                if (!user) {
                    console.error('/POST 404 not found');
                    res
                        .status(404)
                        .send({ messageCode: 'not_found', message: 'User not found' });
                    return;
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordMatch) {
                    console.error('/POST 401 Unauthorized');
                    res.status(401).send({
                        messageCode: 'unauthorized',
                        message: 'Invalid password',
                    });
                    return;
                }
                if (user.refreshToken) {
                    refresh_token = user.refreshToken;
                    const response = this.authenticateToken(refresh_token);
                    if (!response.authenticate) {
                        console.error('/POST 403 Forbidden');
                        return res.status(403).send({
                            messageCode: 'forbidden',
                            response,
                        });
                    }
                    access_token = this.generateAccessToken(user.email);
                }
                else {
                    access_token = this.generateAccessToken(user.email);
                    refresh_token = this.generateRefreshToken(user.email);
                    this.userService.updateRefreshToken(user.email, refresh_token);
                }
                res
                    .cookie('access_token', access_token, {
                    httpOnly: true,
                    //path: '/*',
                    //secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 15 * 60 * 1000, // 15 minutos
                })
                    .cookie('refresh_token', refresh_token, {
                    httpOnly: true,
                    //path: '/*',
                    //secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
                })
                    .status(200)
                    .json({ success: true, message: 'Login realizado com sucesso!' });
                console.log('/POST 200 OK');
            }
            catch (error) {
                console.error(`/POST 500 ${error}`);
                res.status(500).send({
                    messageCode: 'server_error',
                    message: 'internal server error',
                });
            }
        });
        this.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies['refresh_token'];
                const user = yield this.userService.getUserByRefreshToken(refreshToken);
                if (!user) {
                    return res.status(403).json({ message: 'Token inválido' });
                }
                yield this.userService.updateRefreshToken(user.email, '');
                res
                    .clearCookie('access_token')
                    .clearCookie('refresh_token')
                    .status(200)
                    .json({ message: 'Logout realizado com sucesso!' });
                console.log('/POST logout 200 OK');
            }
            catch (error) {
                console.error(`/DELETE/login/logout 500 ${error}`);
                res.status(500).send({
                    messageCode: 'server_error',
                    message: 'internal server error',
                });
            }
        });
        this.refreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies['refresh_token'];
            if (!refreshToken) {
                return res.status(401).json({ message: 'Refresh token não fornecido' });
            }
            const user = yield this.userService.getUserByRefreshToken(refreshToken);
            if (!user) {
                return res.status(403).json({ message: 'Token inválido' });
            }
            const response = this.authenticateToken(refreshToken);
            if (!response.authenticate) {
                return res.status(403).json({ message: 'Token inválido' });
            }
            const accessToken = this.generateAccessToken(user.email);
            return res
                .cookie('access_token', accessToken, {
                httpOnly: false,
                //path: '/*',
                //secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000, // 15 minutos
            })
                .cookie('refresh_token', refreshToken, {
                httpOnly: false,
                //path: '/*',
                ///secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
            })
                .status(200)
                .json({ success: 'true', message: 'Token de acesso renovado' });
        });
        this.verifyToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies['access_token'];
            if (!token) {
                console.log('GET /login/verify 401 sem token');
                return res.status(401).json({ authenticated: false });
            }
            try {
                const decoded = this.authenticateToken(token);
                if (decoded.authenticate) {
                    console.log('GET /login/verify 200 OK');
                    return res.status(200).json({ authenticated: true });
                }
                else {
                    console.log('GET /login/verify 401 Unauthorized');
                    return res.status(401).json({ authenticated: false });
                }
            }
            catch (error) {
                console.error(`/GET/login/verify 500 ${error}`);
                return res.status(500).json({ authenticated: false });
            }
        });
        this.verifyRefreshToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies['refresh_token'];
            if (!token) {
                console.log('GET /login/verifyRefresh 401 sem token');
                return res.status(204).json({ authenticated: false });
            }
            const response = this.authenticateToken(token);
            console.log('response', response);
            if (response.authenticate === true) {
                console.log('GET /login/verify 200 OK');
                return res.status(200).json({ authenticated: true });
            }
            else {
                console.log('GET /login/verify 401 Unauthorized');
                return res.status(401).json(response.message);
            }
        });
        this.router = router;
        this.userService = userService;
        this.initRoutes();
        this.SECRET = process.env.JWT_SECRET || 'secret';
    }
    initRoutes() {
        this.router.post(this.prefix, (req, res) => {
            this.login(req, res);
        });
        this.router.post(`/logout`, (req, res) => {
            this.logout(req, res);
        });
        this.router.post('/refresh', (req, res) => {
            this.refreshToken(req, res);
        });
        this.router.get(`${this.prefix}/verify`, (req, res) => {
            this.verifyToken(req, res);
        });
        this.router.get(`${this.prefix}/verifyRefresh`, (req, res) => {
            this.verifyRefreshToken(req, res);
        });
    }
}
exports.default = LoginControler;

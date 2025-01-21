"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerConfig_1 = __importDefault(require("./swaggerConfig"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const server = (0, express_1.default)();
// Middleware para lidar com JSON
server.use(body_parser_1.default.json());
// Middleware para lidar com cookies
server.use((0, cookie_parser_1.default)());
// Middleware para lidar com formulários
server.use(express_1.default.urlencoded({ extended: false }));
//Redirecionamento para a documentação
server.get('/', (req, res) => {
    res.redirect('/api/docs');
});
// Middleware para lidar com CSS
server.use('/customUI.css', express_1.default.static(path_1.default.join(__dirname, 'customUI.css')));
//Middleware para documentação usando Swagger
server.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.default, {
    customSiteTitle: 'Eixos API',
    customCssUrl: '/customUI.css',
}));
// Middleware para CORS
const corsOptions = {
    origin: 'http://localhost:4000', // Permitir acesso de qualquer origem
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos permitidos
    allowedHeaders: [
        'Content-Type',
        'Accept',
        'Origin',
        'X-Requested-With',
    ], // C
    credentials: true,
    accessControlAllowCredentials: true,
    accessControlAllowOrigin: 'http://localhost:4000',
    accessControlAllowHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    accessControlAllowMethods: 'GET, POST, PUT, PATCH, DELETE',
    //allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};
server.use((0, cors_1.default)(corsOptions));
exports.default = server;

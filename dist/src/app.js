"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./api/conf/server"));
const routes_1 = __importDefault(require("./api/routes"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = server_1.default;
const PORT = process.env.PORT || 3000;
app.use(routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`If production, server is running on https://eixos-api.onrender.com`);
    console.log('See the API documentation at https://eixos-api.onrender.com/api/docs');
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.app = void 0;
const server_1 = __importDefault(require("../../src/api/conf/server"));
const routes_1 = __importDefault(require("../../src/api/routes"));
const app = server_1.default;
exports.app = app;
const PORT = process.env.PORT || 3000;
exports.PORT = PORT;
app.use(routes_1.default);

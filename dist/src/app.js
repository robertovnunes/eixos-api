"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./api/conf/server"));
const routes_1 = __importDefault(require("./api/routes"));
const app = server_1.default;
const PORT = process.env.PORT || 3000;
app.use(routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

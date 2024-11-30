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
const http_error_1 = require("../utils/errors/http.error");
const uuid_1 = require("uuid");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
class BaseRepository {
    constructor(fileName) {
        this.db = [];
        try {
            this.filePath = path_1.default.join(__dirname, '../../database', `${fileName}.json`);
            this.loadData().then(data => this.db = data);
        }
        catch (error) {
            throw new http_error_1.HttpInternalServerError({ msg: 'Error while trying to access the database', msgCode: 'database-error' });
        }
    }
    // Método para carregar dados do arquivo
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs_1.promises.readFile(this.filePath, 'utf-8');
                return JSON.parse(data);
            }
            catch (error) {
                if (error.code === 'ENOENT') {
                    // Retorna um array vazio se o arquivo não existir
                    return [];
                }
                throw error;
            }
        });
    }
    // Método para salvar dados no arquivo
    saveData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs_1.promises.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
        });
    }
    // CRUD Methods
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.find((item) => item.id === id) || null;
        });
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.loadData();
            const newItem = Object.assign(Object.assign({}, item), { id: (0, uuid_1.v4)() });
            data.push(newItem);
            yield this.saveData(data);
            return item;
        });
    }
    update(id, updatedItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.loadData();
            const index = data.findIndex((item) => item.id === id);
            if (index === -1)
                return null;
            // Atualiza apenas os campos fornecidos
            const updatedData = Object.assign(Object.assign({}, data[index]), updatedItem);
            data[index] = updatedData;
            yield this.saveData(data);
            return updatedData;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.loadData();
            const filteredData = data.filter((item) => item.id !== id);
            if (filteredData.length === data.length)
                return false;
            yield this.saveData(filteredData);
            return true;
        });
    }
}
exports.default = BaseRepository;

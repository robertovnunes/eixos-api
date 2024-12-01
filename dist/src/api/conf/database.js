"use strict";
// src/database/mongodb-connection.ts
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
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
class MongoDBConnection {
    constructor() {
        this.dbUser = process.env.DB_USER;
        this.dbPassword = process.env.DB_PASSWORD;
        this.dbName = process.env.DATABASE;
        this.connectionString = `mongodb+srv://${this.dbUser}:${this.dbPassword}@cluster0.lnlwm.mongodb.net/${this.dbName}?retryWrites=true&w=majority&appName=Cluster0`;
    }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!MongoDBConnection.instance) {
                console.log('Criando uma nova conexão com o MongoDB...');
                MongoDBConnection.instance = new MongoDBConnection(); // Corrigido
                yield MongoDBConnection.instance.connect();
            }
            return MongoDBConnection.instance;
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(this.connectionString);
                console.log('Conectado ao MongoDB com Mongoose!');
            }
            catch (err) {
                console.error('Erro ao conectar ao MongoDB:', err);
                throw err;
            }
        });
    }
    get connection() {
        return mongoose_1.default.connection;
    }
}
exports.default = MongoDBConnection;

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
const user_model_1 = __importDefault(require("../models/user.model"));
const base_repository_1 = __importDefault(require("./base.repository"));
const database_1 = __importDefault(require("../conf/database"));
class UserRepository extends base_repository_1.default {
    constructor() {
        const userModel = new user_model_1.default().model;
        super(userModel);
    }
    /**
     * Busca um usuário com base no e-mail fornecido.
     * @param email - E-mail do usuário a ser buscado.
     * @returns O usuário encontrado ou null.
     */
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.getInstance();
            return this.model.findOne({ email }).exec();
        });
    }
    /**
     * Busca temporizador definido como padrão pelo usuário.
     * @param userId - ID do usuário.
     * @returns O ID do temporizador padrão ou null.
    */
    findDefaultTimer(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.getInstance();
            const user = yield this.model.findById(userId).exec();
            if (user && user.defaultTimer) {
                return user.defaultTimer.toString();
            }
            return null;
        });
    }
    /**
     * atualiza o refreshToken do usuário.
     * @param userId - ID do usuário.
     * @param refreshToken - Token de atualização.
     * @returns O usuário atualizado.
     */
    updateRefreshToken(email, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.getInstance();
            this.model.findOneAndUpdate({ email }, { refreshToken }).exec();
        });
    }
    /**
     * Busca usuario pelo refreshToken.
     * @param refreshToken - Token de atualização.
     * @returns O usuário encontrado ou null.
     */
    findByRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.getInstance();
            return this.model.findOne({ refreshToken }).exec();
        });
    }
}
exports.default = UserRepository;

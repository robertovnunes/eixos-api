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
const database_1 = __importDefault(require("../conf/database"));
/**
 * Classe base abstrata para repositórios.
 *
 * Fornece métodos básicos para interagir com o banco de dados MongoDB
 * usando o Mongoose.
 *
 * @template T - Tipo de documento do Mongoose.
 */
class BaseRepository {
    /**
     * Construtor.
     * @param model - Modelo do Mongoose a ser usado pelo repositório.
     */
    constructor(model) {
        this.model = model;
    }
    /**
     * Cria um novo registro no banco de dados.
     * @param data - Dados do novo registro.
     * @returns Promise que resolve com o registro criado.
     */
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.getInstance(); // Garantir que o banco está conectado
            const record = new this.model(data);
            return yield record.save();
        });
    }
    /**
     * Busca um registro pelo ID.
     * @param id - ID do registro.
     * @returns Promise que resolve com o registro encontrado ou null se não encontrado.
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.getInstance();
            return yield this.model.findById(id);
        });
    }
    /**
     * Busca todos os registros.
     * @returns Promise que resolve com uma lista de registros.
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.getInstance();
            return yield this.model.find();
        });
    }
    /**
     * Atualiza um registro pelo ID.
     * @param id - ID do registro a ser atualizado.
     * @param data - Dados a serem atualizados.
     * @returns Promise que resolve com o registro atualizado ou null se não encontrado.
     */
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.getInstance();
            return yield this.model.findByIdAndUpdate(id, data, { new: true });
        });
    }
    /**
     * Exclui um registro pelo ID.
     * @param id - ID do registro a ser excluído.
     * @returns Promise que resolve com o registro excluído ou null se não encontrado.
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.getInstance();
            return yield this.model.findByIdAndDelete(id);
        });
    }
}
exports.default = BaseRepository;

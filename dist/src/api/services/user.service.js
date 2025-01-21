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
const user_entity_1 = __importDefault(require("../entities/user.entity"));
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.findAll();
            return users.map(user => new user_entity_1.default(user));
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            return user ? new user_entity_1.default(user) : null;
        });
    }
    getUserDefaultTimer(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findDefaultTimer(userId);
        });
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.create(data);
            return new user_entity_1.default(user);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(userId);
            return user ? new user_entity_1.default(user) : null;
        });
    }
    updateUser(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.update(userId, data);
            return user ? new user_entity_1.default(user) : null;
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.delete(userId);
        });
    }
    updateRefreshToken(email, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.updateRefreshToken(email, refreshToken);
        });
    }
    getUserByRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByRefreshToken(refreshToken);
            return user ? new user_entity_1.default(user) : null;
        });
    }
}
exports.default = UserService;

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
const timer_entity_1 = __importDefault(require("../entities/timer.entity"));
class TimerService {
    constructor(timerRepository) {
        this.timerRepository = timerRepository;
    }
    /**
     * Converte um documento do Mongoose para a entidade TimerEntity.
     * @param timerModel - Documento retornado pelo Mongoose.
     * @returns Instância de TimerEntity.
     */
    toEntity(timerModel) {
        return new timer_entity_1.default({
            _id: timerModel._id, // Converte ObjectId para string.
            name: timerModel.name,
            focusTime: timerModel.focusTime,
            shortBreakTime: timerModel.shortBreakTime,
            loops: timerModel.loops,
            longBreakTime: timerModel.longBreakTime,
        });
    }
    getTimers() {
        return __awaiter(this, void 0, void 0, function* () {
            const timers = yield this.timerRepository.findAll();
            return timers.map((timer) => this.toEntity(timer));
        });
    }
    createTimer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const timer = yield this.timerRepository.create(data);
            return this.toEntity(timer);
        });
    }
    getTimerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const timer = yield this.timerRepository.findById(id);
            return timer ? this.toEntity(timer) : null;
        });
    }
    updateTimer(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const timer = yield this.timerRepository.update(id, data);
            return timer ? this.toEntity(timer) : null;
        });
    }
    deleteTimer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.timerRepository.delete(id);
        });
    }
}
exports.default = TimerService;

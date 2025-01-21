"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = __importDefault(require("./base.model"));
class TimerModel extends base_model_1.default {
    constructor() {
        super('Timer', {
            name: { type: String, required: true },
            focusTime: { type: Number, required: true },
            shortBreakTime: { type: Number, required: true },
            loops: { type: Number, required: true },
            longBreakTime: { type: Number, required: false },
        });
    }
}
exports.default = TimerModel;

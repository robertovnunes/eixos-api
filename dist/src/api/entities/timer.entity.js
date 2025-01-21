"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = __importDefault(require("./base.entity"));
class TimerEntity extends base_entity_1.default {
    constructor(data) {
        super(data);
        this.name = data.name || '';
        this.focusTime = data.focusTime || 0;
        this.shortBreakTime = data.shortBreakTime || 0;
        this.loops = data.loops || 1;
        if (data.longBreakTime) {
            this.longBreakTime = data.longBreakTime;
        }
    }
}
exports.default = TimerEntity;

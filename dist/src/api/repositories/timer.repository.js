"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_repository_1 = __importDefault(require("./base.repository"));
const timer_model_1 = __importDefault(require("../models/timer.model"));
class TimerRepository extends base_repository_1.default {
    constructor() {
        const timerModel = new timer_model_1.default().model;
        super(timerModel);
    }
}
exports.default = TimerRepository;

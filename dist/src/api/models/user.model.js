"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const base_model_1 = __importDefault(require("./base.model"));
class UserModel extends base_model_1.default {
    constructor() {
        super('User', {
            _id: { type: mongoose_1.Types.ObjectId, auto: true },
            name: { type: String, required: true },
            email: { type: String, required: true },
            password: { type: String, required: true },
            phone: { type: Object, required: false },
            defaultTimer: { type: mongoose_1.Types.ObjectId, ref: "timers", required: false },
            theme: { type: String, required: false },
            refreshToken: { type: String, required: false },
        });
    }
}
exports.default = UserModel;

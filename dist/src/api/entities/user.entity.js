"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = __importDefault(require("./base.entity"));
class UserEntity extends base_entity_1.default {
    constructor(data) {
        super(data);
        this.name = data.name || "";
        this.email = data.email || "";
        this.password = data.password || "";
        this.phone = data.phone || {};
        this.defaultTimer = data.defaultTimer || undefined;
        this.theme = data.theme || "";
        this.refreshToken = data.refreshToken || "";
    }
}
exports.default = UserEntity;

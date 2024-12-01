"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailureResult = exports.SuccessResult = exports.Result = void 0;
class Result {
    constructor({ msg, msgCode, code, }) {
        this.msg = msg;
        this.msgCode = msgCode;
        this.code = code;
    }
    static transformRequestOnMsg(req) {
        return `${req.method} ${req === null || req === void 0 ? void 0 : req.originalUrl}`;
    }
}
exports.Result = Result;
class SuccessResult extends Result {
    constructor({ msg, msgCode, code, data, }) {
        super({ msg, msgCode: msgCode || 'success', code: code || 200 });
        this.data = data;
    }
    handle(res) {
        return res.status(this.code).send(this);
    }
}
exports.SuccessResult = SuccessResult;
class FailureResult extends Result {
    constructor({ msg, msgCode, code, }) {
        super({ msg, msgCode: msgCode || 'failure', code: code || 500 });
    }
    handle(res) {
        return res.status(this.code).send(this);
    }
}
exports.FailureResult = FailureResult;

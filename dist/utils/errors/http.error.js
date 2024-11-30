"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpNotImplementedError = exports.HttpInternalServerError = exports.HttpNotFoundError = exports.HttpForbiddenError = exports.HttpUnauthorizedError = exports.HttpBadRequestError = exports.HttpError = void 0;
class HttpError extends Error {
    constructor({ status, msg, msgCode, slug, }) {
        super(msg);
        this.msg = msg;
        this.status = status;
        this.msgCode = msgCode || 'failure';
        this.slug = slug || 'http-error';
    }
    toString() {
        return `[${this.name}]: msg: ${this.msg}, msgCode: ${this.msgCode}, status: ${this.status}, stack: ${this.stack}`;
    }
}
exports.HttpError = HttpError;
class HttpBadRequestError extends HttpError {
    constructor({ msg, msgCode }) {
        super({ status: 400, msg, msgCode, slug: 'bad-request' });
    }
}
exports.HttpBadRequestError = HttpBadRequestError;
class HttpUnauthorizedError extends HttpError {
    constructor({ msg, msgCode }) {
        super({ status: 401, msg, msgCode, slug: 'unauthorized' });
    }
}
exports.HttpUnauthorizedError = HttpUnauthorizedError;
class HttpForbiddenError extends HttpError {
    constructor({ msg, msgCode }) {
        super({ status: 403, msg, msgCode, slug: 'forbidden' });
    }
}
exports.HttpForbiddenError = HttpForbiddenError;
class HttpNotFoundError extends HttpError {
    constructor({ msg, msgCode }) {
        super({ status: 404, msg, msgCode, slug: 'not-found' });
    }
}
exports.HttpNotFoundError = HttpNotFoundError;
class HttpInternalServerError extends HttpError {
    constructor({ msg, msgCode } = {}) {
        super({
            status: 500,
            msg: msg || 'Internal Server Error',
            msgCode,
            slug: 'internal-server',
        });
    }
}
exports.HttpInternalServerError = HttpInternalServerError;
class HttpNotImplementedError extends HttpError {
    constructor({ msg, msgCode } = {}) {
        super({
            status: 501,
            msg: msg || 'Not Implemented Error',
            msgCode,
            slug: 'not-implemented',
        });
    }
}
exports.HttpNotImplementedError = HttpNotImplementedError;

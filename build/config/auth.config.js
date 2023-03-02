"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salt_rounds = exports.domain = exports.secret = void 0;
exports.secret = process.env.SECRET;
exports.domain = process.env.DOMAIN;
exports.salt_rounds = Number(process.env.BCRYPT_SALT_ROUNDS);
//# sourceMappingURL=auth.config.js.map
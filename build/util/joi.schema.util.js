"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = exports.resetSchema = exports.forgetSchema = exports.registerSchema = exports.loginSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().label("password"),
});
exports.registerSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).max(40).required(),
    phone: joi_1.default.number().required(),
});
exports.forgetSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
exports.resetSchema = joi_1.default.object({
    oldPassword: joi_1.default.string().required(),
    newPassword: joi_1.default.string().min(8).max(40).required(),
});
exports.updateProfileSchema = joi_1.default.object({
    firstName: joi_1.default.string(),
    lastName: joi_1.default.string(),
    phone: joi_1.default.number(),
});
//# sourceMappingURL=joi.schema.util.js.map
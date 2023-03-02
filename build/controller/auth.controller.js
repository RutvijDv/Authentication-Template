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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset = exports.forget = exports.login = exports.create = exports.register = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var auth_config_1 = require("../config/auth.config");
var user_service_1 = require("../service/user.service");
var mail_service_1 = require("../service/mail.service");
var auth_config_2 = require("../config/auth.config");
//Register new User
function register(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, userExists, token, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    user = req.body;
                    return [4 /*yield*/, (0, user_service_1.doesUserExistByEmail)(user.email)];
                case 1:
                    userExists = _a.sent();
                    if (userExists) {
                        res.status(401).json({ error: "User already created" });
                        return [2 /*return*/];
                    }
                    user.password = bcrypt_1.default.hashSync(user.password, auth_config_2.salt_rounds);
                    token = jsonwebtoken_1.default.sign(user, auth_config_1.secret, { expiresIn: '10m' });
                    return [4 /*yield*/, (0, mail_service_1.sendMail)(user.firstName, user.email, token, "activation")];
                case 2:
                    _a.sent();
                    res.status(200).json({ message: "Mail sent to " + user.email });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    res.status(500).json({ error: "Server Error" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.register = register;
//Creating User
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var token, decoded, email, userExists, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = req.query.jwt;
                    //No Token found
                    if (!token) {
                        res.status(403).json({ error: "Bad Credentials" });
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    decoded = jsonwebtoken_1.default.verify(token, auth_config_1.secret);
                    email = decoded.email;
                    return [4 /*yield*/, (0, user_service_1.doesUserExistByEmail)(email)];
                case 2:
                    userExists = _a.sent();
                    if (userExists) {
                        res.status(401).json({ error: "User already created" });
                        return [2 /*return*/];
                    }
                    //Create User
                    return [4 /*yield*/, (0, user_service_1.createUser)(decoded)];
                case 3:
                    //Create User
                    _a.sent();
                    res.status(201).send({ msg: "User Registered" });
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    res.status(500).json({ error: "Server Error" });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
//Login User
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, userExists, user, isPasswordValid, id, token, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, (0, user_service_1.doesUserExistByEmail)(email)];
                case 1:
                    userExists = _b.sent();
                    if (!userExists) {
                        res.status(404).json({ "error": "User not Registered" });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, user_service_1.getPasswordByEmail)(email)];
                case 2:
                    user = _b.sent();
                    isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
                    if (!isPasswordValid) {
                        res.status(401).json({ error: "Bad Credentials" });
                        return [2 /*return*/];
                    }
                    id = user.id;
                    token = jsonwebtoken_1.default.sign({ id: id, email: email }, auth_config_1.secret, { expiresIn: 86400 });
                    res.status(200).json({
                        email: user.email,
                        token: token
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _b.sent();
                    res.status(500).json({ error: "Server Error" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
//Forget Password
function forget(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, userExists, user, id, token, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    email = req.body.email;
                    return [4 /*yield*/, (0, user_service_1.doesUserExistByEmail)(email)];
                case 1:
                    userExists = _a.sent();
                    if (!userExists) {
                        console.log("not found");
                        res.status(404).json({ "error": "No user found" });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, user_service_1.getUserByEmail)(email)];
                case 2:
                    user = _a.sent();
                    id = user.id;
                    token = jsonwebtoken_1.default.sign({ email: email, id: id }, auth_config_1.secret, { expiresIn: '10m' });
                    (0, mail_service_1.sendMail)(user.firstName, email, token, "forget");
                    res.sendStatus(200);
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    res.status(500).json({ "error": "Server Error" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.forget = forget;
//Reset Password
function reset(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, oldPassword, newPassword, id, email, user, isPasswordValid, err_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                    id = req.user.id;
                    email = req.user.email;
                    return [4 /*yield*/, (0, user_service_1.getPasswordByEmail)(email)];
                case 1:
                    user = _b.sent();
                    isPasswordValid = bcrypt_1.default.compareSync(oldPassword, user.password);
                    if (!isPasswordValid) {
                        res.status(401).json({ error: "Bad Credentials" });
                        return [2 /*return*/];
                    }
                    //Update new Password
                    return [4 /*yield*/, (0, user_service_1.updatePassword)(id, newPassword)];
                case 2:
                    //Update new Password
                    _b.sent();
                    res.status(201).json({ "message": "password has been reset" });
                    return [3 /*break*/, 4];
                case 3:
                    err_5 = _b.sent();
                    res.status(500).json({ "error": "Server Error" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.reset = reset;
//# sourceMappingURL=auth.controller.js.map
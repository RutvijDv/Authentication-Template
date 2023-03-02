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
exports.updateProfileById = exports.updatePassword = exports.getUserById = exports.getPasswordByEmail = exports.getAllUsers = exports.getUserByEmail = exports.createUser = exports.doesUserExistByEmail = void 0;
var model_1 = __importDefault(require("../model"));
var bcrypt_1 = __importDefault(require("bcrypt"));
// Initiating DB class
var db = new model_1.default();
var User = db.user;
var doesUserExistByEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (user)
                    return [2 /*return*/, true];
                return [2 /*return*/, false];
        }
    });
}); };
exports.doesUserExistByEmail = doesUserExistByEmail;
var createUser = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.create(userData)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.createUser = createUser;
var getUserByEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.findOne({
                    email: email
                }, { password: 0 })];
            case 1:
                user = _a.sent();
                if (user)
                    return [2 /*return*/, user];
                throw "Error: User with email " + email + " does not exist";
        }
    });
}); };
exports.getUserByEmail = getUserByEmail;
var getAllUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.find({}, {
                    prefix: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1
                })];
            case 1:
                user = _a.sent();
                if (user)
                    return [2 /*return*/, user];
                throw "Error: No User Exist ";
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var getPasswordByEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (user)
                    return [2 /*return*/, user];
                throw "Error: User with email " + email + " does not exist";
        }
    });
}); };
exports.getPasswordByEmail = getPasswordByEmail;
var getUserById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.findOne({
                    _id: id
                }, { password: 0 })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserById = getUserById;
var updatePassword = function (id, password) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.updateOne({
                        _id: id
                    }, {
                        $set: {
                            "password": bcrypt_1.default.hashSync(password.toString(), 8)
                        }
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                throw "Error: User not updated";
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updatePassword = updatePassword;
var updateProfileById = function (id, update) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.updateOne({
                    _id: id
                }, { $set: update })];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, exports.getUserById)(id)];
            case 2:
                user = _a.sent();
                if (user)
                    return [2 /*return*/, user];
                throw "Error: User with id " + id + " does not exist";
        }
    });
}); };
exports.updateProfileById = updateProfileById;
// export const isAuthor = async (userId : string, researchId : string) : Promise < boolean > => {
//     const found = await Author.findOne({userId: userId, researchId: researchId});
//     if (found != null) 
//         return true;
//     return false;
// };
//# sourceMappingURL=user.service.js.map
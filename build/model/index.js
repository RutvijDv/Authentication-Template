"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importing Packages
var mongoose_1 = __importDefault(require("mongoose"));
var user_model_1 = __importDefault(require("./user.model"));
var file_model_1 = __importDefault(require("./file.model"));
//Database Class
var DB = /** @class */ (function () {
    function DB() {
        this.mongoose = mongoose_1.default;
        this.user = user_model_1.default;
        this.file = file_model_1.default;
    }
    return DB;
}());
exports.default = DB;
//# sourceMappingURL=index.js.map
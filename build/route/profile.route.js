"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importing Packages
var express_1 = __importDefault(require("express"));
var profile_controller_1 = require("../controller/profile.controller");
var jwtAuth_1 = __importDefault(require("../middleware/jwtAuth"));
var validate_middleware_1 = __importDefault(require("../middleware/validate.middleware"));
var joi_schema_util_1 = require("../util/joi.schema.util");
var router = express_1.default.Router();
//GET Profile Route
router.get("/", jwtAuth_1.default, profile_controller_1.getProfile);
//PUT Profile Route
router.put("/", jwtAuth_1.default, (0, validate_middleware_1.default)(joi_schema_util_1.updateProfileSchema), profile_controller_1.putProfile);
exports.default = router;
//# sourceMappingURL=profile.route.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importing Packages
var express_1 = __importDefault(require("express"));
var auth_controller_1 = require("../controller/auth.controller");
var jwtAuth_1 = __importDefault(require("../middleware/jwtAuth"));
var validate_middleware_1 = __importDefault(require("../middleware/validate.middleware"));
var joi_schema_util_1 = require("../util/joi.schema.util");
var router = express_1.default.Router();
//Register and Login Routes
router.post("/register", (0, validate_middleware_1.default)(joi_schema_util_1.registerSchema), auth_controller_1.register);
router.get("/jwtverify", auth_controller_1.create);
router.post("/login", (0, validate_middleware_1.default)(joi_schema_util_1.loginSchema), auth_controller_1.login);
//Forget and Reset Routes
router.post("/forget", (0, validate_middleware_1.default)(joi_schema_util_1.forgetSchema), auth_controller_1.forget);
router.put("/reset", jwtAuth_1.default, (0, validate_middleware_1.default)(joi_schema_util_1.resetSchema), auth_controller_1.reset);
exports.default = router;
//# sourceMappingURL=auth.route.js.map
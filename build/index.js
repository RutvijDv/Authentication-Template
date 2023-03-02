"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importing Packages
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var model_1 = __importDefault(require("./model"));
var db_config_1 = require("./config/db.config");
var route_1 = require("./route");
var helmet_1 = __importDefault(require("helmet"));
//Creating Express App
var app = (0, express_1.default)();
var PORT = Number(process.env.PORT) || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
var db = new model_1.default();
//MongoDB Connection
db.mongoose
    .connect(db_config_1.URL)
    .then(function () {
    console.log("Successfully connect to MongoDB.");
})
    .catch(function (err) {
    console.error("Connection error", err);
    process.exit();
});
//API Routes
app.use("/api/auth", route_1.authRouter);
app.use("/api/user", route_1.profileRouter);
//App listening on {Port}
app.listen(PORT, function () {
    console.log("Server Running on port " + PORT);
});
//# sourceMappingURL=index.js.map
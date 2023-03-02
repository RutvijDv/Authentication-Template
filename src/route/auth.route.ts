//Importing Packages
import express from "express";
import { register, create, login, forget, reset } from "../controller/auth.controller";
import verifyToken from "../middleware/jwtAuth";
import validate from "../middleware/validate.middleware";
import { registerSchema, loginSchema, forgetSchema, resetSchema } from "../util/joi.schema.util";

const router = express.Router();

//Register and Login Routes
router.post("/register", validate(registerSchema), register);
router.get("/jwtverify", create);
router.post("/login", validate(loginSchema), login);

//Forget and Reset Routes
router.post("/forget", validate(forgetSchema), forget);
router.put("/reset", verifyToken, validate(resetSchema), reset);

export default router;
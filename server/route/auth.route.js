//Importing Packages
const express = require("express");
const {
  register,
  create,
  login,
  forgetPasswordRequest,
  forgetPassword,
  reset,
} = require("../controller/auth.controller");
const verifyToken = require("../middleware/jwtAuth");
const validate = require("../middleware/validate.middleware");
const {
  registerSchema,
  loginSchema,
  forgetPasswordRequestSchema,
  forgetPasswordSchema,
  resetSchema,
} = require("../util/joi.schema.util");

const router = express.Router();

//Register and Login Routes
router.post("/register", validate(registerSchema), register);
router.get("/jwtverify", create);
router.post("/login", validate(loginSchema), login);

//Forget and Reset Routes
router.put("/reset", verifyToken, validate(resetSchema), reset);
router.post(
  "/forgetpasswordrequest",
  validate(forgetPasswordRequestSchema),
  forgetPasswordRequest
);
router.put("/forgetpassword", validate(forgetPasswordSchema), forgetPassword);

module.exports = router;

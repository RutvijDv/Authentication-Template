//Importing Packages
const express = require("express");
const {
  register,
  create,
  login,
  forget,
  reset,
} = require("../controller/auth.controller");
const verifyToken = require("../middleware/jwtAuth");
const validate = require("../middleware/validate.middleware");
const {
  registerSchema,
  loginSchema,
  forgetSchema,
  resetSchema,
} = require("../util/joi.schema.util");

const router = express.Router();

//Register and Login Routes
router.post("/register", validate(registerSchema), register);
router.get("/jwtverify", create);
router.post("/login", validate(loginSchema), login);

//Forget and Reset Routes
router.post("/forget", validate(forgetSchema), forget);
router.put("/reset", verifyToken, validate(resetSchema), reset);

module.exports = router;

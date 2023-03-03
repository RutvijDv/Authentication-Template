//Importing Packages
const express = require("express");
const { getProfile, putProfile } = require("../controller/profile.controller");
const verifyToken = require("../middleware/jwtAuth");
const validate = require("../middleware/validate.middleware");
const { updateProfileSchema } = require("../util/joi.schema.util");

const router = express.Router();

//GET Profile Route
router.get("/", verifyToken, getProfile);

//PUT Profile Route
router.put("/", verifyToken, validate(updateProfileSchema), putProfile);

module.exports = router;

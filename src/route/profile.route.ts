//Importing Packages
import express from "express";
import { getProfile, putProfile } from "../controller/profile.controller";
import verifyToken from "../middleware/jwtAuth";
import validate from "../middleware/validate.middleware";
import { updateProfileSchema } from "../util/joi.schema.util";

const router = express.Router();

//GET Profile Route
router.get("/", verifyToken, getProfile);

//PUT Profile Route
router.put("/", verifyToken, validate(updateProfileSchema), putProfile);

export default router;
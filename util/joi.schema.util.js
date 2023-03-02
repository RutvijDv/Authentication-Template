const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().label("password"),
});

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(40).required(),
  phone: Joi.number().required(),
});

const forgetPasswordRequestSchema = Joi.object({
  email: Joi.string().email().required(),
});

const forgetPasswordSchema = Joi.object({
  password: Joi.string().min(8).max(40).required(),
});

const resetSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).max(40).required(),
});

const updateProfileSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.number(),
});

module.exports = {
  loginSchema,
  registerSchema,
  forgetPasswordRequestSchema,
  forgetPasswordSchema,
  resetSchema,
  updateProfileSchema,
};

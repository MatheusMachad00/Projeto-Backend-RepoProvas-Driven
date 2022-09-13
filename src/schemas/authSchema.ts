import joi from "joi";

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(10).required()
});

export const signupSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(10).required(),
  confirmPassword: joi.string().required().valid(joi.ref('password'))
});
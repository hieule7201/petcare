import Joi from "joi";
import HttpStatus from "http-status-codes";

const registerValidation = Joi.object({
  name: Joi.string().required().min(3).max(50),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().required().min(8).max(50),
});

export default registerValidation;

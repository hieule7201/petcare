import Joi from "joi";

const loginValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default loginValidation;

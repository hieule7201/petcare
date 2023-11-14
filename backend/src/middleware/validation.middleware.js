import Exception from "../helper/Exception.js";
import HttpStatus from "http-status-codes";
const validation = (schema) => async (req, res, next) => {
  const body = req.body;

  try {
    await schema.validateAsync(body);
    return next();
  } catch (e) {
    next(e);
  }
};

export default validation;

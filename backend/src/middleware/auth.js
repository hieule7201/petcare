import Exception from "../helper/Exception.js";
import HttpStatusCode from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const Authenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(
      new Exception(HttpStatusCode.BAD_REQUEST, Exception.LOGIN_AGAIN)
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = User.findById(decoded.id);
  console.log(req.user._conditions._id);
  next();
};

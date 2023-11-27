import userService from "../service/user.service.js";
import HttpStatus from "http-status-codes";
import jwt from "jsonwebtoken";
import Exception from "../helper/Exception.js";
const options = {
  expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  HttpOnly: true,
  sameSite: "none",
  secure: true,
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await userService.register({ name, email, password });
    res.status(HttpStatus.OK).json({
      message: "register successfully",
      data: "",
    });
  } catch (e) {
    next(e);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userLogin = await userService.login({ email, password });

    res
      .status(HttpStatus.OK)
      .cookie("token", userLogin.token, options)
      .json({ message: "login successfully" });
  } catch (error) {
    next(error);
  }
};
const get_user = async (req, res, next) => {
  try {
    const id = req.user._conditions._id;

    const user = await userService.get_user(id);

    res
      .status(HttpStatus.OK)
      .json({ message: "get user successfully", data: user });
  } catch (error) {
    next(error);
  }
};
export default { register, login, get_user };

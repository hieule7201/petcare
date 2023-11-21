import userService from "../service/user.service.js";
import HttpStatus from "http-status-codes";
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

export default { register, login };

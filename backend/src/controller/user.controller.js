import userService from "../service/user.service.js";
import HttpStatus from "http-status-codes";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await userService.register({ name, email, password });
    res.status(HttpStatus.OK).json({
      message: "register successfully",
    });
  } catch (e) {
    next(e);
  }
};

export default { register };

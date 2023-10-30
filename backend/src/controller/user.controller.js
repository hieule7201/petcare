const { body } = require("express-validator");
const userService = require("../service/user.service.js");
const HttpStatus = require("../helper/HttpStatus.js");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userService.register({ name, email, password });
    res.status(HttpStatus.OK).json({
      message: "register successfully",
    });
  } catch (exception) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: exception.toString() });
  }
};

module.exports = { register };

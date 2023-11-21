import Exception from "../helper/Exception.js";
import HttpStatus from "http-status-codes";
import userSchema from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async ({ name, email, password }) => {
  try {
    const existingUser = await userSchema.findOne({ email }).exec();
    if (!!existingUser) {
      throw new Exception(HttpStatus.BAD_REQUEST, Exception.USER_EXIST);
    }
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUND)
    );
    const createUser = await userSchema.create({
      name,
      email,
      password: hashPassword,
    });
    return createUser;
  } catch (err) {
    throw err;
  }
};

const login = async ({ email, password }) => {
  try {
    const existingUser = await userSchema.findOne({ email }).exec();
    if (!existingUser) {
      throw new Exception(HttpStatus.BAD_REQUEST, Exception.WRONG_EMAIL);
    }
    let isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      throw new Exception(HttpStatus.BAD_REQUEST, Exception.WRONG_PASSWORD);
    }
    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    console.log(existingUser.id);
    return {
      token: token,
    };
  } catch (error) {
    throw error;
  }
};

export default { register, login };

import Exception from "../helper/Exception.js";
import HttpStatus from "http-status-codes";
import userSchema from "../model/user.model.js";
import bcrypt from "bcrypt";

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

export default { register };

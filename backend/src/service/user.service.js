const Exception = require("../helper/Exception.js");
const userSchema = require("../model/user.model.js");
const bcrypt = require("bcrypt");

const register = async ({ name, email, password }) => {
  const existingUser = await userSchema.findOne({ email }).exec();
  if (!!existingUser) {
    throw new Exception(Exception.USER_EXIST);
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
};

module.exports = { register };

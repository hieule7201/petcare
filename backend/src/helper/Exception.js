module.exports = class Exception extends Error {
  static CANNOT_CONNECT_MONGO = "Cannot connect to Mongo";
  static CANNOT_REGISTER_USER = "cannot register user";
  static USER_EXIST = "user already";
  constructor(message) {
    super(message);
    console.log(message);
  }
};

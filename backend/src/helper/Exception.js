export default class Exception extends Error {
  static CANNOT_CONNECT_MONGO = "Cannot connect to Mongo";
  static CANNOT_REGISTER_USER = "cannot register user";
  static USER_EXIST = "user already";
  static WRONG_EMAIL = "wrong email";
  static WRONG_PASSWORD = "wrong password";
  static LOGIN_AGAIN = "please login to continue";
  constructor(statusCode, message) {
    super(message);
    this.name = "Exception";

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

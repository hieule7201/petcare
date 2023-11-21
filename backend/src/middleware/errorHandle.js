import HttpStatus from "http-status-codes";

const errorHandle = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || HttpStatus[err.statusCode],

    stack: err.stack,
  };
  res.status(responseError.statusCode).json(responseError);
  console.log(responseError.stack);
};
export default errorHandle;

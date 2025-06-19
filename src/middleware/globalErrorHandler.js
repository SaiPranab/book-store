const {StatusCodes} = require('http-status-codes');
const commonResponse = require('../common/commonResponse');
const { ENV } = require('../config/config');

const globalErrorHandler = (err, req, res, next) => {
  // console.log('error occurred', err);
  // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message)
  
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = ENV === 'dev' ? err.message : "Something went wrong! please try again later"

  console.log('error occurred', err);
  commonResponse(res, statusCode, false, null, "Internal Server Error", message)
}

module.exports = globalErrorHandler;
const {StatusCodes} = require('http-status-codes');
const commonResponse = require('../common/commonResponse');
const { ENV } = require('../config/config');

const globalErrorHandler = (err, req, res, next) => {
  console.log('error occurred', err);


  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = ENV === 'dev' ? err.message : "Something went wrong! please try again later"
  const title = err.title || "Internal Server Error"

  commonResponse(res, statusCode, false, null, title, message)
}

module.exports = globalErrorHandler;
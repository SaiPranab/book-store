const {StatusCodes} = require('http-status-codes');
const commonResponse = require('../common/commonResponse');
const { ENV } = require('../config/config');

const globalErrorHandler = (err, req, res, next) => {
  if (ENV === 'dev') {
    console.error('Error:', err);
  }

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const title = err.title || "Internal Server Error"
  const message = ENV === 'dev' ? err.message : "Something went wrong! please try again later"

  commonResponse(res, statusCode, false, null, title, message)
}

module.exports = globalErrorHandler;
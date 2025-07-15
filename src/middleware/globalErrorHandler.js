const {StatusCodes} = require('http-status-codes');
const commonResponse = require('../common/commonResponse');
const { ENV } = require('../config/config');
const { ErrorTitles, ErrorMessages } = require('../utils/errors/errorMessages');

const globalErrorHandler = (err, req, res, next) => {
  if (ENV === 'dev') {
    console.error('Error:', err);
  }

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const title = err.title || ErrorTitles.INTERNAL_SERVER_ERROR;
  const message = ENV === 'dev' ? err.message : ErrorMessages.GENERAL_FAILURE

  commonResponse(res, statusCode, false, null, title, message)
}

module.exports = globalErrorHandler;
const {StatusCodes} = require('http-status-codes');
const commonResponse = require('../common/commonResponse');

const globalErrorHandler = (err, req, res, next) => {
  // console.log('error occurred', err);
  // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message)
  
  console.log('error occurred', err);
  commonResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, false, null, "Internal Server Error", err.message)
}

module.exports = globalErrorHandler;
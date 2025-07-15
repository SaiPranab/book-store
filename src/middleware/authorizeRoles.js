const jwt = require('jsonwebtoken');
const userRoles = require('../modules/auth/userRoles');
const commonResponse = require('../common/commonResponse');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/AppError');
const { ErrorTitles } = require('../utils/errors/errorMessages');
const { ErrorMessages } = require('../utils/errors/errorMessages');

const authorizeRoles = (req, res, next) => {
  const role = req.role;
  
  if(role !== userRoles.AUTHOR){
    throw new AppError( ErrorTitles.UNAUTHORIZED, ErrorMessages.UNAUTHORIZED_ACCESS, StatusCodes.UNAUTHORIZED)
  }

  next()
}

module.exports = authorizeRoles
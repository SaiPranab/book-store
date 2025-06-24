const jwt = require('jsonwebtoken');
const userRoles = require('../modules/auth/userRoles');
const commonResponse = require('../common/commonResponse');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/AppError');

const authorizeRoles = (req, res, next) => {
  const role = req.role;
  
  if(role !== userRoles.AUTHOR){
    throw new AppError( 'Unauthorized', 'You do not have permission to access this resource', StatusCodes.UNAUTHORIZED)
  }

  next()
}

module.exports = authorizeRoles
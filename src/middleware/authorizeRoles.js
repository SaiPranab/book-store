const jwt = require('jsonwebtoken');
const userRoles = require('../modules/auth/userRoles');
const commonResponse = require('../common/commonResponse');
const { StatusCodes } = require('http-status-codes');

const authorizeRoles = (req, res, next) => {
  const role = req.role;
  
  if(role !== userRoles.AUTHOR){
    return commonResponse(res, StatusCodes.UNAUTHORIZED, false, null, 'Unauthorized', 'You do not have permission to access this resource')
  }

  next()
}

module.exports = authorizeRoles
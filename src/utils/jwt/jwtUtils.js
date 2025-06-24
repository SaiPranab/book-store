const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../errors/AppError');

const createToken = (claim, secret, expiresIn) => {
  const token = jwt.sign({ ...claim }, secret, { expiresIn });
  return token;
}

const verifyToken = (token, secret) => {
 let payload;
  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    
    throw new AppError( 'Token Error', 'Token expired or malformed', StatusCodes.UNAUTHORIZED);
  }

  return payload
}
module.exports = {createToken, verifyToken}
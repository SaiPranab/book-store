const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/AppError');

require('dotenv-flow').config()

const requiredEnvironmentVars = ['ENV', 'PORT', 'JWT_SECRET', 'JWT_REFRESH_SECRET', 
          'ACCESS_TOKEN_EXPIRY', 'REFRESH_TOKEN_EXPIRY', 'DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];

requiredEnvironmentVars.forEach((key) => {
  if (!process.env[key]) {
    throw new AppError('Internal Server Error', `Environment variable ${key} is required.`, StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

module.exports = {
  ENV: process.env.ENV,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
}
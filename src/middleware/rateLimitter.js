const {rateLimit} = require('express-rate-limit');
const { StatusCodes } = require('http-status-codes');

const rateLimitter = (maxRequest, time) => {
  return rateLimit({
    max: maxRequest,
    windowMs: time,
    message: "Too many requests, please try again later !",
    statusCode: StatusCodes.TOO_MANY_REQUESTS, // 429
    standardHeaders : true,
    legacyHeaders: false,
  })
}

module.exports = rateLimitter;
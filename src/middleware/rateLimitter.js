const {rateLimit} = require('express-rate-limit')

const rateLimitter = (maxRequest, time) => {
  return rateLimit({
    max: maxRequest,
    windowMs: time,
    message: "Too many requests, please try again later !",
    statusCode: 429,
    standardHeaders : true,
    legacyHeaders: false,
  })
}

module.exports = rateLimitter;
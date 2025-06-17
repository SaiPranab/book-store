const successReponse = (res, statusCode, success, message, data = null) => {
  return res.status(statusCode).json({
    data,
    success,
    message,
    timestamp: new Date().toISOString()
  })
}

const failureReponse = (res, statusCode, success = false, title, message) => {
  return res.status(statusCode).json({
    success,
    title,
    message,  
    timestamp: new Date().toISOString()
  })
}

module.exports = {successReponse, failureReponse};
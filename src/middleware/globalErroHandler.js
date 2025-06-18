const globalErrorHandler = (err, req, res, next) => {
  console.log('error occurred', err);
}

module.exports = globalErrorHandler;
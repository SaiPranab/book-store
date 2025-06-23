class AppError extends Error {
  constructor(title, message, statusCode) {
    super(message);
    this.title = title;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
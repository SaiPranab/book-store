const ErrorTitles = {
  BAD_REQUEST: 'Bad Request',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not Found',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  LOGIN_ERROR: 'Login Error',
  REGISTRATION_ERROR: 'Registration Error',
  TOKEN_ERROR: 'Token Error',
  LOGOUT_ERROR: 'Logout Error',
};

const ErrorMessages = {
  MISSING_FIELDS: 'Required fields are missing.',
  INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password.',
  USER_ALREADY_EXISTS: 'User already exists with this email.',
  TOKEN_EXPIRED_OR_INVALID: 'Token expired or malformed.',
  INVALID_REFRESH_TOKEN: 'Invalid or malformed refresh token',
  UNAUTHORIZED_ACCESS: 'You do not have permission to access this resource.',
  REFRESH_TOKEN_REUSE: 'Refresh token reuse detected. Session revoked.',
  BOOK_NOT_FOUND: id => `Book not found with id: ${id}`,
  USER_NOT_FOUND:  `User not found `,
  GENERAL_FAILURE: 'Something went wrong. Please try again later.',
  ENVIRONMENT_VARIABLE_MISSING: key => `Environment variable ${key} is required.`,
};

module.exports = { ErrorTitles, ErrorMessages };

const { StatusCodes } = require('http-status-codes');
const commonResponse = require('../../common/commonResponse');
const authService = require('./authService');
const userRoles = require('./userRoles');
const AppError = require('../../utils/errors/AppError');
const { ErrorTitles, ErrorMessages } = require('../../utils/errors/errorMessages');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new AppError(ErrorTitles.BAD_REQUEST, ErrorMessages.MISSING_FIELDS, StatusCodes.BAD_REQUEST);
  }

  const newUser = await authService.register(name, email, password, userRoles.USER);
  return commonResponse(res, StatusCodes.CREATED, true, newUser);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError(ErrorTitles.BAD_REQUEST, ErrorMessages.MISSING_FIELDS, StatusCodes.BAD_REQUEST);
  }

  const tokens = await authService.login(email, password);
  return commonResponse(res, StatusCodes.OK, true, tokens);
};

const issueNewRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new AppError(ErrorTitles.BAD_REQUEST, ErrorMessages.MISSING_FIELDS, StatusCodes.BAD_REQUEST);
  }

  const tokens = await authService.newRefreshToken(refreshToken);
  return commonResponse(res, StatusCodes.OK, true, tokens);
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new AppError(ErrorTitles.BAD_REQUEST, ErrorMessages.MISSING_FIELDS, StatusCodes.BAD_REQUEST);
  }

  await authService.logout(refreshToken);
  return commonResponse(res, StatusCodes.OK, true, 'Logged out successfully');
};

const registerAuthor = async (req, res) => {
  const { authorName, email, password } = req.body;
  if (!authorName || !email || !password)
    throw new AppError(ErrorTitles.BAD_REQUEST, ErrorMessages.MISSING_FIELDS, StatusCodes.BAD_REQUEST);

  const newUser = await authService.register(authorName, email, password, userRoles.AUTHOR)
  return commonResponse(res, StatusCodes.CREATED, true, newUser);
}

module.exports = {
  registerUser,
  loginUser,
  issueNewRefreshToken,
  logout,
  registerAuthor
};
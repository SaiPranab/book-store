const { StatusCodes } = require('http-status-codes');
const commonResponse = require('../../common/commonResponse');
const authService = require('./authService');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return commonResponse(res, StatusCodes.BAD_REQUEST, false, null, 'Bad Request', 'name, email and password are required');
    }

    const newUser = await authService.register(name, email, password);
    newUser.clientIp = req.clientIp;
    return commonResponse(res, StatusCodes.CREATED, true, newUser);
  } catch (err) {
    return commonResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, false, null, 'Register failed', err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return commonResponse(res, StatusCodes.BAD_REQUEST, false, null, 'Bad Request', 'email and password are required');
    }

    const tokens = await authService.login(email, password);
    return commonResponse(res, StatusCodes.OK, true, tokens);
  } catch (err) {
    return commonResponse(res, StatusCodes.UNAUTHORIZED, false, null, 'Login failed', err.message);
  }
};

const issueNewRefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return commonResponse(res, StatusCodes.BAD_REQUEST, false, null, 'Bad Request', 'Refresh token is required');
    }

    const tokens = await authService.newRefreshToken(refreshToken);
    return commonResponse(res, StatusCodes.OK, true, tokens);
  } catch (err) {
    return commonResponse(res, StatusCodes.UNAUTHORIZED, false, null, 'Token refresh failed', err.message);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return commonResponse(res, StatusCodes.BAD_REQUEST, false, null, 'Bad Request', 'Refresh token is required');
    }

    await authService.logout(refreshToken);
    return commonResponse(res, StatusCodes.OK, true, 'Logged out successfully');
  } catch (err) {
    return commonResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, false, null, 'Logout failed', err.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  issueNewRefreshToken,
  logout
};

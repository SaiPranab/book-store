const bcrypt = require('bcryptjs');
const authRepo = require('./authRepository');
const {JWT_SECRET, JWT_REFRESH_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY} = require('../../config/config');
const { verifyToken, createToken } = require('../../utils/jwt/jwtUtils');
const AppError = require('../../utils/errors/AppError');
const { StatusCodes } = require('http-status-codes');

const register = async (name, email, password, role) => {
  const existingUser = await authRepo.findUserByEmail(email);
  if (existingUser){
    throw new AppError('Registration Error', 'User already exists with this email', StatusCodes.CONFLICT);
  } 

  const hashedPassword = await bcryp.hash(password, 10);
  const user = await authRepo.createUser(name, email, hashedPassword, role);
  return user;
};

const login = async (email, password) => {  
  const user = await authRepo.findUserByEmail(email);
  if (!user || !user.active){
    throw new AppError('Login Error', 'Invalid email or account is inactive', StatusCodes.UNAUTHORIZED);
  } 

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError( 'Login Error', 'Incorrect password', StatusCodes.UNAUTHORIZED);
  }

  const accessToken = createToken({userId: user.id, role: user.role}, JWT_SECRET, ACCESS_TOKEN_EXPIRY)
  const refreshToken = createToken({ userId: user.id }, JWT_REFRESH_SECRET, REFRESH_TOKEN_EXPIRY)
  
  await authRepo.saveRefreshToken(refreshToken);

  return { accessToken, refreshToken };
};

const newRefreshToken = async (refreshToken) => {
  const savedRefreshToken = await authRepo.findRefreshToken(refreshToken);
  if (!savedRefreshToken) {
    throw new AppError('Token Error', 'Refresh token is invalid ', StatusCodes.UNAUTHORIZED);
  }

  const payload = verifyToken(refreshToken, JWT_REFRESH_SECRET);
  const { userId } = payload

  const user = await authRepo.findUserById(userId); 
  if (!user || !user.active) {
    throw new AppError('Token Error', 'User not found or inactive', StatusCodes.UNAUTHORIZED);
  }

  const accessToken = createToken({ userId, role: user.role }, JWT_SECRET, ACCESS_TOKEN_EXPIRY )
  const newRefreshToken = createToken({ userId }, JWT_REFRESH_SECRET, REFRESH_TOKEN_EXPIRY )

  await authRepo.deleteRefreshToken(refreshToken);
  await authRepo.saveRefreshToken( newRefreshToken);

  return { accessToken, refreshToken: newRefreshToken };
};

const logout = async (refreshToken) => {
  await authRepo.deleteRefreshToken(refreshToken);
};

module.exports = {
  register,
  login,
  newRefreshToken,
  logout
};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRepo = require('./authRepository');
const {JWT_SECRET, JWT_REFRESH_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY} = require('../../config/config')

const register = async (name, email, password) => {
  const existingUser = await authRepo.findUserByEmail(email);
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await authRepo.createUser(name, email, hashedPassword);
  return user;
};

const login = async (email, password) => {  
  const user = await authRepo.findUserByEmail(email);
  if (!user || !user.active) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const accessToken = createToken({userId: user.id, role: user.role}, JWT_SECRET, ACCESS_TOKEN_EXPIRY)
  const refreshToken = createToken({ userId: user.id }, JWT_REFRESH_SECRET, REFRESH_TOKEN_EXPIRY)

  console.log(refreshToken);
  
  await authRepo.saveRefreshToken(refreshToken);

  return { accessToken, refreshToken };
};

const newRefreshToken = async (refreshToken) => {
  const stored = await authRepo.findRefreshToken(refreshToken);
  if (!stored) throw new Error('Refresh token invalid or revoked');

  const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
  const userId = decoded.userId;

  const accessToken = createToken({ userId }, JWT_SECRET, ACCESS_TOKEN_EXPIRY )
  const newRefreshToken = createToken({ userId }, JWT_REFRESH_SECRET, REFRESH_TOKEN_EXPIRY )

  await authRepo.deleteRefreshToken(refreshToken);
  await authRepo.saveRefreshToken( newRefreshToken);

  return { accessToken, refreshToken: newRefreshToken };
};

const logout = async (refreshToken) => {
  await authRepo.deleteRefreshToken(refreshToken);
};

const createToken = (claim, secret, expiresIn) => {
  const token = jwt.sign({ ...claim }, secret, { expiresIn });
  return token;
}

module.exports = {
  register,
  login,
  newRefreshToken,
  logout
};

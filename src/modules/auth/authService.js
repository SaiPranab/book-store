const bcrypt = require('bcryptjs');
const authRepo = require('./authRepository');
const {JWT_SECRET, JWT_REFRESH_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY} = require('../../config/config');
const { verifyToken, createToken } = require('../../utils/jwt/jwtUtils');
const AppError = require('../../utils/errors/AppError');
const { StatusCodes } = require('http-status-codes');
const { getExpiryTime } = require('../../utils/time/timeUtils');

const register = async (name, email, password, role) => {
  const existingUser = await authRepo.findUserByEmail(email);
  if (existingUser){
    throw new AppError('Registration Error', 'User already exists with this email', StatusCodes.CONFLICT);
  } 

  const hashedPassword = await bcrypt.hash(password, 10);
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
    throw new AppError('Login Error', 'Incorrect password', StatusCodes.UNAUTHORIZED);
  }

  return await generateAndStoreTokens(user.id, user.role)
};


const newRefreshToken = async (refreshToken) => {
  const payload = verifyToken(refreshToken, JWT_REFRESH_SECRET);
  const { userId, sessionId } = payload;

  const session = await verifySession(sessionId, refreshToken)

  const user = await authRepo.findUserById(userId);
  if (!user || !user.active) {
    throw new AppError('Token Error', 'User not found or inactive', StatusCodes.UNAUTHORIZED);
  }

  // invalidate previous sessions
  await invalidateSessions(session);

  console.log(user);
  
  return await generateAndStoreTokens(user.id, user.role);
};

const logout = async (refreshToken) => {
  const payload = verifyToken(refreshToken, JWT_REFRESH_SECRET);
  const { sessionId } = payload;

  await verifySession(sessionId, refreshToken);

  const session = await authRepo.findSessionById(sessionId);
  if (!session || session.token_type !== 'refresh_token') {
    throw new AppError('Logout Error', 'Invalid refresh token', StatusCodes.UNAUTHORIZED);
  }

  await invalidateSessions(session);  
};

const generateAndStoreTokens = async (userId, role) =>{  
  // create new access token
  const newAccessSessionId = crypto.randomUUID();
  const newAccessToken = createToken(
    { userId, sessionId: newAccessSessionId, role },
    JWT_SECRET,
    ACCESS_TOKEN_EXPIRY
  );

  // Create new refresh token
  const newRefreshSessionId = crypto.randomUUID();
  const newRefreshToken = createToken(
    { userId, sessionId: newRefreshSessionId },
    JWT_REFRESH_SECRET,
    REFRESH_TOKEN_EXPIRY
  );

  // Save both tokens to DB
  const newAccessExpiresAt = getExpiryTime(ACCESS_TOKEN_EXPIRY);
  const newRefreshExpiresAt = getExpiryTime(REFRESH_TOKEN_EXPIRY);

  await authRepo.createSession({
    session_id: newAccessSessionId,
    user_id: userId,
    session_token: newAccessToken,
    token_type: 'access_token',
    is_active: true,
    login_time: new Date(),
    expires_at: newAccessExpiresAt,
  });

  await authRepo.createSession({
    session_id: newRefreshSessionId,
    user_id: userId,
    session_token: newRefreshToken,
    token_type: 'refresh_token',
    is_active: true,
    login_time: new Date(),
    expires_at: newRefreshExpiresAt,
    related_token_id: newAccessSessionId,
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
} 

const verifySession = async (sessionId, refreshToken) => {
   const session = await authRepo.findSessionById(sessionId);

  if (!session || !session.is_active || session.token_type !== 'refresh_token') {
    throw new AppError('Token Error', 'Refresh token is invalid or expired', StatusCodes.UNAUTHORIZED);
  }

  const isMatch = await bcrypt.compare(refreshToken, session.session_token)
  if (!isMatch) {
    await invalidateSessions(session);
    throw new AppError('Refresh Token Reuse Error', 'Refresh token reuse detected. Session revoked', StatusCodes.UNAUTHORIZED);
  }

  return session;
}

const invalidateSessions = async (session) => {
  await authRepo.invalidateSession(session.session_id); 
  await authRepo.invalidateSession(session.related_token_id);
}

module.exports = {
  register,
  login,
  newRefreshToken,
  logout
};
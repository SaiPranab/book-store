const { StatusCodes } = require("http-status-codes");
const { JWT_SECRET } = require("../config/config");
const { verifyToken } = require("../utils/jwt/jwtUtils");
const AppError = require("../utils/errors/AppError");
const authRepo = require('../modules/auth/authRepository');
const { ErrorTitles, ErrorMessages } = require("../utils/errors/errorMessages");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if(!authHeader || !authHeader.startsWith('Bearer')) {
    throw new AppError("Bad Request", "Authorization header should not be empty", StatusCodes.UNAUTHORIZED)
  }

  const accessToken = authHeader.split(' ')[1];

  const payload = verifyToken(accessToken, JWT_SECRET);
  const {userId, role, sessionId, exp} = payload;
  // console.log("exp", exp);
  

  if(!userId || !role || !sessionId) {
    throw new AppError(ErrorTitles.BAD_REQUEST, ErrorMessages.MISSING_FIELDS, StatusCodes.UNAUTHORIZED)
  }

  const session = await authRepo.findSessionById(sessionId);
  // console.log('sessin expirationtime', session.expires_at, session.expires_at / 1000, Date.now()/ 1000);
  
  const sessionExpirationTime = session.expires_at / 1000;
  if (!session || !session.is_active || session.token_type !== 'access_token' || 
                                                        session.session_token !== accessToken || exp > sessionExpirationTime) {
    throw new AppError(ErrorTitles.UNAUTHORIZED, ErrorMessages.TOKEN_EXPIRED_OR_INVALID, StatusCodes.UNAUTHORIZED);
  }

  req.userId = userId;
  req.role = role;
  req.sessionId = sessionId;
  next();
}

module.exports = authMiddleware
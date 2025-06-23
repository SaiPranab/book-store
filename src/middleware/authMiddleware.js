const { StatusCodes } = require("http-status-codes");
const { JWT_SECRET } = require("../config/config");
const { verifyToken } = require("../utils/jwt/jwtUtils");
const AppError = require("../utils/errors/AppError");


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if(!authHeader || !authHeader.startsWith('Bearer')) {
    throw new AppError("Bad Request", "Authorization header should not be empty", StatusCodes.UNAUTHORIZED)
  }

  const accessToken = authHeader.split(' ')[1];
  console.log(accessToken);
  
  const payload = verifyToken(accessToken, JWT_SECRET);
  const {userId, role} = payload;

  if(!userId || !role) {
    throw new AppError("Bad Request", "Invalid token payload: missing userId or role", StatusCodes.UNAUTHORIZED)
  }

  req.userId = userId;
  req.role = role;
  next();
}

module.exports = authMiddleware
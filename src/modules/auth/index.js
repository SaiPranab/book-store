const authRoutes = require('./authRoutes');
const authController = require('./authController');
const authService = require('./authauthService');
const authRepository = require('./authauthRepository');
const userRoles = require('./userRoles');

module.exports = {
  authRoutes,
  authController,
  authService,
  authRepository,
  userRoles
};
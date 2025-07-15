const authRoutes = require('./authRoutes');
const authController = require('./authController');
const authService = require('./authService');
const authRepository = require('./authRepository');
const userRoles = require('./userRoles');

module.exports = {
  authRoutes,
  authController,
  authService,
  authRepository,
  userRoles
};
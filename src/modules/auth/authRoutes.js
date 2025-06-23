const express = require('express')
const { registerUser, loginUser, issueNewRefreshToken, logout, registerAuthor } = require('./authController')
const ipLogger = require('../../middleware/ipLogger')
const authMiddleware = require('../../middleware/authMiddleware')
const authorizeRoles = require('../../middleware/authorizeRoles')

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post('/issue-refresh-token', issueNewRefreshToken)
router.post("/logout", logout)
router.post("/register-author", authMiddleware, authorizeRoles, registerAuthor)

module.exports = router;
const express = require('express')
const { registerUser, loginUser, issueNewRefreshToken, logout } = require('./authController')
const ipLogger = require('../../middleware/ipLogger')

const router = express.Router()

router.post("/register", ipLogger, registerUser)
router.post("/login", loginUser)
router.post('/issue-refresh-token', issueNewRefreshToken)
router.post("/logout", logout)

module.exports = router;
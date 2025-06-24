const express = require('express')
const { registerUser, loginUser, issueNewRefreshToken, logout, registerAuthor } = require('./authController')
const ipLogger = require('../../middleware/ipLogger')
const authMiddleware = require('../../middleware/authMiddleware')
const authorizeRoles = require('../../middleware/authorizeRoles')

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", ipLogger('😁'), loginUser)
router.post('/issue-refresh-token', issueNewRefreshToken)
router.post("/logout", logout)
router.post("/register-author", authMiddleware, authorizeRoles, registerAuthor)
router.get('/get', authMiddleware, (req, res) => {
  return res.send("works")
})

module.exports = router;
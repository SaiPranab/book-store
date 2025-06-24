const express = require('express')
const {createBook, getAllBooks, getBookById, updateBookById, deleteBook} = require("./bookController");
const ipLogger = require('../../middleware/ipLogger');
const authMiddleware = require('../../middleware/authMiddleware');
const authorizeRoles = require('../../middleware/authorizeRoles');

const router = express.Router();

router.get("/", getAllBooks)
router.get("/:id", getBookById)
router.post("/", ipLogger('some random value'), authMiddleware, authorizeRoles, createBook)
router.put("/:id", authMiddleware, authorizeRoles, updateBookById)
router.delete("/:id", authMiddleware, authorizeRoles, deleteBook)

module.exports = router;
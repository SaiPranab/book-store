const express = require('express')
const {createBook, getAllBooks, getBookById, updateBookById, deleteBook} = require("./bookController");
const ipLogger = require('../../middleware/ipLogger');

const router = express.Router();

router.post("/", ipLogger('some random value'), createBook)
router.get("/", getAllBooks)
router.get("/:id", getBookById)
router.put("/:id", updateBookById)
router.delete("/:id", deleteBook)

module.exports = router;
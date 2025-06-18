const express = require('express')
const {createBook, getAllBooks, getBookById, updateBookById, deleteBook} = require("./bookController")

const router = express.Router();

router.post("/", createBook)
router.get("/", getAllBooks)
router.get("/:id", getBookById)
router.put("/:id", updateBookById)
router.delete("/:id", deleteBook)

module.exports = router;
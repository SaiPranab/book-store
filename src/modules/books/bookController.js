const commonResponse = require('../../common/commonResponse')
const { StatusCodes } = require("http-status-codes");
const bookService = require("./bookService");

const createBook = async (req, res) => {
  const { title, author } = req.body;
  try {
    if (!title || !author) {
      return commonResponse(res, StatusCodes.BAD_REQUEST, false, null, 'Bad Request', 'title and author are required')
    }

    const newBook = await bookService.createBook(title, author);
    newBook.clientIp = req.clientIp;
    return commonResponse(res, StatusCodes.CREATED, true, newBook);
  } catch (error) {
    console.error(error);
    return commonResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, false, null, "Server Error", error.message);
  }
};

const getAllBooks = async (req, res) => {
  try {
    debugger
    const books = await bookService.getAllBooks();
    
    return commonResponse(res, StatusCodes.OK, true, books);
  } catch (error) {
    console.error(error);
    return commonResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, false, null, "Server Error", "Failed to fetch books");
  }
};

const getBookById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const book = await bookService.getBookById(id);
    if (!book) {
      return commonResponse(res, StatusCodes.NOT_FOUND, false, null, "Not Found", `Book not found with id: ${id}`);
    }
    return commonResponse(res, StatusCodes.OK, true, book);
  } catch (error) {
    console.error(error);
    return commonResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, false, null, "Server Error", "Failed to fetch book");
  }
};

const deleteBook = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedBook = await bookService.deleteBookById(id);
    if (!deletedBook) {
      return commonResponse(res, StatusCodes.NOT_FOUND, false, null, "Not Found", `Book not found with id: ${id}`);
    }
    return commonResponse(res, StatusCodes.ACCEPTED, true, deletedBook);
  } catch (error) {
    console.error(error);
    return commonResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, false, null, "Server Error", "Failed to delete book");
  }
};

const updateBookById = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  try {
    if (!title || !author) {
      return commonResponse(res, StatusCodes.BAD_REQUEST, false, null, "Bad Request", "No fields to update");
    }

    const updatedBook = await bookService.updateBookById(id, { title, author });
    if (!updatedBook) {
      return commonResponse(res, StatusCodes.NOT_FOUND, false, null, "Not Found", `Book not found with id: ${id}`);
    }

    return commonResponse(res, StatusCodes.ACCEPTED, true, updatedBook);
  } catch (error) {
    console.error(error);
    return commonResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, false, null, "Server Error", "Failed to update book");
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBook,
};

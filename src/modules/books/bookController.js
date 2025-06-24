const { StatusCodes } = require('http-status-codes');
const commonResponse = require('../../common/commonResponse');
const bookService = require('./bookService');
const AppError = require('../../utils/errors/AppError');

const createBook = async (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    throw new AppError('Bad Request', 'Title and author are required', StatusCodes.BAD_REQUEST);
  }

  const newBook = await bookService.createBook(title, author);
  newBook.clientIp = req.clientIp;

  return commonResponse(res, StatusCodes.CREATED, true, newBook);
};

const getAllBooks = async (req, res) => {
  const books = await bookService.getAllBooks();
  return commonResponse(res, StatusCodes.OK, true, books);
};

const getBookById = async (req, res) => {
  const id = parseInt(req.params.id);
  const book = await bookService.getBookById(id);

  if (!book) {
    throw new AppError('Not Found', `Book not found with id: ${id}`, StatusCodes.NOT_FOUND);
  }

  return commonResponse(res, StatusCodes.OK, true, book);
};

const updateBookById = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  if (!title || !author) {
    throw new AppError('Bad Request', 'Title and author are required', StatusCodes.BAD_REQUEST);
  }

  const updatedBook = await bookService.updateBookById(id, { title, author });

  if (!updatedBook) {
    throw new AppError('Not Found', `Book not found with id: ${id}`, StatusCodes.NOT_FOUND);
  }

  return commonResponse(res, StatusCodes.ACCEPTED, true, updatedBook);
};

const deleteBook = async (req, res) => {
  const id = parseInt(req.params.id);
  const deletedBook = await bookService.deleteBookById(id);

  if (!deletedBook) {
    throw new AppError('Not Found', `Book not found with id: ${id}`, StatusCodes.NOT_FOUND);
  }

  return commonResponse(res, StatusCodes.ACCEPTED, true, deletedBook);
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBook,
};

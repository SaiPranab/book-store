const bookRoutes = require('./bookRoutes');
const bookController = require('./bookController');
const bookService = require('./bookService');
const bookRepository = require('./bookRepository');
const bookModel = require('./bookModel');

module.exports = {
  bookRoutes,
  bookController,
  bookService,
  bookRepository,
  bookModel
};
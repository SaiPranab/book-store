const bookRepository = require("./bookRepository");

const createBook = async (title, author) => {
  const result = await bookRepository.save(title, author);
  const savedBook = {
    id: result.insertId,
    title,
    author
  }

  return savedBook;
};

const getAllBooks = async () => {
  const books = await bookRepository.findAll();
  return books;
};

const getBookById = async (id) => {
  const book = await bookRepository.findById(id);
  if (!book) {
    return null;
  }

  return book;
};

const deleteBookById = async (id) => {
  const book = await bookRepository.findById(id);
  if (!book) return null;

  await bookRepository.deleteById(id);
  return book;
};

const updateBookById = async (id, updates) => {
  const book = await bookRepository.findById(id);
  if (!book) return null;

  await bookRepository.updateById(id, updates);
  
  const updatedBook = await bookRepository.findById(id);
  return updatedBook;
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};

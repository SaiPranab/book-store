const { title } = require("process")
const books = require("../database/book")

let counter = 0;

const createBook = (req, res) => {
  const {title, author} = req.body;
  
  if(!title || !author){
    return res.status(404).json({message : "title and author not found"})
  }

  const newBook = {
    id: ++counter,
    title,
    author
  }

  books.push(newBook);

  res.status(201).json({
    message : "Book added successfully",
    data: newBook
  })
}

const getAllBooks = (req, res) => {
  res.status(200).json(books);
}

const getBookById = (req, res) => {
  const bookId = parseInt(req.params.id);

  const existingBook = books.find(book => book.id === bookId);

  if(!existingBook) {
    return res.status(404).json({message:"book not found with id:- " + bookId})
  }

  res.status(200).json(existingBook)
}

const updateBookById = (req, res) => {
  const bookId = parseInt(req.params.id);
  
  const existingBook = books.find(book => book.id === bookId);
  if(!existingBook) {
    return res.status(404).json({message:"book not found with id:- " + bookId})
  }

  const {title, author} = req.body;
  if(title) existingBook.title = title;
  if(author) existingBook.author = author;

  res.status(200).json({ message: "Book updated successfully", existingBook });
}

const deleteBook = (req, res) => {
  const bookId = parseInt(req.params.id);

  const bookIdx = books.findIndex(book => book.id === bookId);

  if(bookIdx === -1) {
    return res.status(404).json({message:"book not found with id:- " + bookId})
  }

  const deletedBook = books.splice(bookIdx, 1);
  console.log("After deleting ", deletedBook)
  res.status(200).json({ message: "Book deleted successfully", book: deletedBook[0] });
}

module.exports = {
                createBook,
                getAllBooks,
                getBookById,
                updateBookById,
                deleteBook
              }
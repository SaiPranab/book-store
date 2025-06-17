const { title } = require("process")
const { successReponse, failureReponse } = require("../../utils/commonResponse")
const {StatusCodes} = require("http-status-codes")


let counter = 0;
let books = [];

const createBook = (req, res) => {
  const {title, author} = req.body;
  
  if(!title || !author){
    // return res.status(404).json({message:"title and author not found"})
    return failureReponse(res, StatusCodes.NOT_FOUND, false, "Not Found", "title and author not found")
  }

  const newBook = {
    id: ++counter,
    title,
    author
  }

  books.push(newBook);

  // res.status(201).json({
  //   message : "Book added successfully",
  //   data: newBook
  // })
  return successReponse(res, StatusCodes.CREATED, true, "Book added successfully", newBook)
}

const getAllBooks = (req, res) => {
  return successReponse(res, StatusCodes.OK, true, "Books Retrieved Successfully", books)
}

const getBookById = (req, res) => {
  const bookId = parseInt(req.params.id);

  const existingBook = books.find(book => book.id === bookId);

  if(!existingBook) {
    // return res.status(StatusCodes.NOT_FOUND).json({message:"book not found with id:- " + bookId})
    return failureReponse(res, StatusCodes.NOT_FOUND, false, "Not Found", `book not found with id:- ${bookId}`)
  }

  return successReponse(res, StatusCodes.OK, true, "Book retrieved successfully", existingBook);
}

const updateBookById = (req, res) => {
  const bookId = parseInt(req.params.id);
  
  const existingBook = books.find(book => book.id === bookId);
  if(!existingBook) {
    return failureReponse(res, StatusCodes.NOT_FOUND, false, "Not Found", `book not found with id:- ${bookId}`)
  }

  const {title, author} = req.body;
  if(title) existingBook.title = title;
  if(author) existingBook.author = author;

  return successReponse(res, StatusCodes.ACCEPTED, true, "Book updated successfully", existingBook);
}

const deleteBook = (req, res) => {
  const bookId = parseInt(req.params.id);

  const bookIdx = books.findIndex(book => book.id === bookId);

  if(bookIdx === -1) {
    return failureReponse(res, StatusCodes.NOT_FOUND, false, "Not Found", `book not found with id:- ${bookId}`)
  }

  const deletedBook = books.splice(bookIdx, 1);
  return successReponse(res, StatusCodes.ACCEPTED, true, "Book deleted successfully", deletedBook);
}

module.exports = {
                createBook,
                getAllBooks,
                getBookById,
                updateBookById,
                deleteBook
              }
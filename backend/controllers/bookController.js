const Book = require("../models/Book");

// @desc     Get all books
// @route    GET /api/books
// @access   Public

const createBook = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc     Create a new book
// @route    POST /api/books
// @access   Private

const getBooks = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc     Get book by ID
// @route    GET /api/books/:id
// @access   Public

const getBookById = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// @desc     Update book
// @route    PUT /api/books/:id
// @access   Private
const updateBook = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc     Delete book
// @route    DELETE /api/books/:id
// @access   Private
const deleteBook = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//  desc Update a book's cover image
// @route PUT /api/books/:id/cover
// @access Private
const updateBookCover = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  updateBookCover,
};

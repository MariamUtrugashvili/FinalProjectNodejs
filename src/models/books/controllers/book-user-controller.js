const express = require('express');
const bookUserRouter = express.Router();
const bookUserService = require('../services/book-user-service');
const { authenticateToken, authorizeRole } = require('../../users/middlewares/auth');

// Get all books
bookUserRouter.get('/books', authenticateToken, authorizeRole('user', 'admin'), async (req, res) => {
    try {
        const books = await bookUserService.getAllBooks();
        res.json({ success: true, data: books });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Get a book by ID
bookUserRouter.get('/getbook/:id', authenticateToken, authorizeRole('user', 'admin'), async (req, res) => {
    const { id } = req.params;
    try {
        const book = await bookUserService.getBookById(id);
        res.json({ success: true, data: book });
    } catch (err) {
        res.status(404).json({ success: false, message: 'Book not found' });
    }
});

// Search books by title
bookUserRouter.get('/book/search', authenticateToken, authorizeRole('user', 'admin'), async (req, res) => {
    const { title } = req.query;
    try {
        const result = await bookUserService.searchByTitle(title);
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(404).json({ success: false, message: 'No books found with that title' });
    }
});

// Borrow a book
bookUserRouter.post('/borrow/:id', authenticateToken, authorizeRole('user', 'admin'), async (req, res) => {
    const { id } = req.params;
    try {
        const result = await bookUserService.borrowBook(id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ success: false, message: 'This book is out of stock' });
    }
});

// Return a book
bookUserRouter.post('/return/:id', authenticateToken, authorizeRole('user', 'admin'), async (req, res) => {
    const { id } = req.params;
    try {
        const result = await bookUserService.returnBook(id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ success: false, message: 'Book not found' });
    }
});

module.exports = bookUserRouter;

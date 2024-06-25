const express = require('express');
const bookAdminRouter = express.Router();
const bookAdminService = require('../services/book-admin-service');
const { authenticateToken, authorizeRole } = require('../../users/middlewares/auth');

bookAdminRouter.post('/book/create', authenticateToken, authorizeRole('admin'), async (req, res) => {
    try {
        await bookAdminService.createBook(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

bookAdminRouter.put('/book/update/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
    try {
        await bookAdminService.updateBook(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

bookAdminRouter.delete('/book/delete/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
    try {
        await bookAdminService.deleteBook(req, res);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = bookAdminRouter;

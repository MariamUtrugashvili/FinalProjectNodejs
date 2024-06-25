const BookModel = require('../schemas/book-create-schema');
const { Op } = require('sequelize');


async function getAllBooks() {
    try {
        const books = await BookModel.findAll();
        return books;
    } catch (err) {
        throw new Error('Error fetching books');
    }
}

async function getBookById(id) {
    try {
        const book = await BookModel.findByPk(id);
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    } catch (err) {
        throw new Error('Error fetching book');
    }
}

async function searchByTitle(title) {
    try {
        const books = await BookModel.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${title}%`
                }
            }
        });

        if (books.length === 0) {
            throw new Error('No books found with that title');
        }

        return books.map(book => ({
            title: book.title,
            quantity: book.bookQuantity
        }));
    } catch (err) {
        console.error(err);
        throw new Error('Error searching books');
    }
}



async function borrowBook(id) {
    try {
        const book = await BookModel.findByPk(id);
        if (!book) {
            throw new Error('Book not found');
        }
        if (book.bookQuantity === 0) {
            throw new Error('This book is out of stock');
        }
        await book.update({ bookQuantity: book.bookQuantity - 1 });
        return { success: true, message: 'Book borrowed successfully' };
    } catch (err) {
        throw new Error(err.message);
    }
}

async function returnBook(id) {
    try {
        const book = await BookModel.findByPk(id);
        if (!book) {
            throw new Error('Book not found');
        }
        await book.update({ bookQuantity: book.bookQuantity + 1 });
        return { success: true, message: 'Book returned successfully' };
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    searchByTitle,
    borrowBook,
    returnBook
};

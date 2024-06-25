const Joi = require('joi');
const genreSchema = Joi.array().items(Joi.string());
const BookModel = require('../schemas/book-create-schema');

const bookSchema = Joi.object({
    title: Joi.string().max(100).optional(),
    author: Joi.string().max(100).optional(),
    publicationYear: Joi.number()
        .integer()
        .min(1000)
        .max(new Date().getFullYear())
        .optional(),
    genre: genreSchema.optional(),
    description: Joi.string().optional(),
    rate: Joi.number().integer().optional(),
    bookQuantity: Joi.number().integer().optional(),
});

async function createBook(req, res) {
    const { error, value: requestBody } = bookSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    if (!requestBody.title || !requestBody.author || !requestBody.publicationYear || !requestBody.bookQuantity) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        const newBook = await BookModel.create(requestBody);
        if (!newBook) {
            return res.status(400).json({
                success: false,
                message: 'Error, could not add data to db',
            });
        }

        return res.json({
            success: true,
            message: 'New Data added successfully',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
}

async function updateBook(req, res) {
    const { id } = req.params;
    const { error, value: requestBody } = bookSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    try {
        const [updated] = await BookModel.update(requestBody, { where: { id } });
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Error, book not found',
            });
        }

        return res.json({
            success: true,
            message: 'Book updated successfully',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
}

async function deleteBook(req, res) {
    const { id } = req.params;

    try {
        const deleted = await BookModel.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Error, book not found',
            });
        }

        return res.json({
            success: true,
            message: 'Book deleted successfully',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
}

module.exports = {
    createBook,
    updateBook,
    deleteBook
};

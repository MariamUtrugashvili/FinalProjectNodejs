const { DataTypes } = require('sequelize');
const {sequelize} = require('../../../services/database/db'); //gvchirdfeba ukve sheqmnili


const BookModel = sequelize.define(
    'BookModel',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        publicationYear: {
            type: DataTypes.INTEGER(),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(600),
            allowNull: true,
        },
        genre: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        rate: {
            type: DataTypes.INTEGER(),
            allowNull: true,
        },
        bookQuantity: {
            type: DataTypes.INTEGER(),
            allowNull: false,
        }
    },
    {
        tableName: 'books',
        timestamps: true,
    }
);


module.exports = BookModel;


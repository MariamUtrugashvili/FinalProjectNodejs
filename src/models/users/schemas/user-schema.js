const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/database/db'); //gvchirdfeba ukve sheqmnili


const UserModel = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: false,
            defaultValue: 'user',
        },
    },
    {
        tableName: 'users',
        timestamps: true,
    }
);

module.exports = UserModel;
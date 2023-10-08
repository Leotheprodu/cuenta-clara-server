const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Users = require('./users');
const Payment_methods = require('./payment_methods');

const User_payment_methods = sequelize.define(
    'user_payment_methods',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Users,
                key: 'id',
            },
        },
        payment_method_id: {
            type: DataTypes.TINYINT,
            references: {
                model: Payment_methods,
                key: 'id',
            },
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cellphone: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        iban: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = User_payment_methods;

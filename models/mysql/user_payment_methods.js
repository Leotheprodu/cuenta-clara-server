const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Users = require('./users');
const Payment_methods = require('./payment_methods');
const Business = require('./business');

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
        payment_method_full_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        payment_method_cellphone: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        payment_method_iban: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        payment_method_email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        payment_method_description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        business_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Business,
                key: 'id',
            },
        },
    },
    {
        timestamps: true,
    },
);

module.exports = User_payment_methods;

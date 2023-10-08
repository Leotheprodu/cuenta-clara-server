const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Payment_methods = sequelize.define(
    'payment_methods',
    {
        id: {
            type: DataTypes.TINYINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
    },
);

module.exports = Payment_methods;

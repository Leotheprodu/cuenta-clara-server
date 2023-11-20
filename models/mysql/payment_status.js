const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Payment_status = sequelize.define(
    'payment_status',
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
        tableName: 'payment_status',
    },
);

module.exports = Payment_status;

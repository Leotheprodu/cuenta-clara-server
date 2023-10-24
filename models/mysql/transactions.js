const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Users = require('./users');
const Payment_methods = require('./payment_methods');
const Payment_status = require('./payment_status');
const Clients = require('./clients');

const Transactions = sequelize.define(
    'transactions',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        parent_user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Users,
                key: 'id',
            },
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Clients,
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
        status_id: {
            type: DataTypes.TINYINT,
            references: {
                model: Payment_status,
                key: 'id',
            },
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: new Date().toISOString().slice(0, 10),
        },
    },
    {
        timestamps: true,
    },
);

module.exports = Transactions;

const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Clients = require('./clients');
const Balances = require('./balances');

const Balance_recharges = sequelize.define(
    'balance_recharges',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Clients,
                key: 'id',
            },
        },
        balance_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Balances,
                key: 'id',
            },
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
        },
    },
    {
        timestamps: true,
    },
);
module.exports = Balance_recharges;

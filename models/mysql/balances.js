const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Clients = require('./clients');
const Business = require('./business');

const Balances = sequelize.define(
    'balances',
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
        business_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Business,
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

module.exports = Balances;

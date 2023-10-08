const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Users = require('./users');
const Clients = require('./clients');

const Invoices = sequelize.define(
    'invoices',
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
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Clients,
                key: 'id',
            },
        },
        description: {
            type: DataTypes.STRING,
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
        },
        paid: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = Invoices;

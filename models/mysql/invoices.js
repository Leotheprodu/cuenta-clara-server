const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Users = require('./users');
const Clients = require('./clients');
const Users_business = require('./users_business');

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
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
        },
        paid: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        business_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Users_business,
                key: 'id',
            },
        },
    },
    {
        timestamps: true,
    },
);

module.exports = Invoices;

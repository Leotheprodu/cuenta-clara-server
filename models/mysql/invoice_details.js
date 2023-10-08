const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Invoices = require('./invoices');

const Invoice_details = sequelize.define(
    'invoice_details',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        invoice_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Invoices,
                key: 'id',
            },
        },
        description: {
            type: DataTypes.STRING,
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'unidad',
        },
        quantity: {
            type: DataTypes.DECIMAL(10, 2),
        },
        unit_price: {
            type: DataTypes.DECIMAL(10, 2),
        },
        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
        },
        /*  item_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Products_and_services,
                key: 'id',
            },
            allowNull: true,
        }, */
    },
    {
        timestamps: true,
    },
);

module.exports = Invoice_details;

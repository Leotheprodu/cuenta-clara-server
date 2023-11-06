const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Users = require('./users');
const Users_business = require('./users_business');

const Products_and_services = sequelize.define(
    'products_and_services',
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
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        unit: {
            type: DataTypes.STRING,
            defaultValue: 'unidad',
        },
        unit_price: {
            type: DataTypes.DECIMAL(10, 2),
        },
        default: {
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
        code: {
            type: DataTypes.STRING,
            unique: true,
        },
        type: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = Products_and_services;

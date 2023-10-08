const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Users = require('./users');

const Rules_cashback_discounts = sequelize.define(
    'rules_cashback_discounts',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        max_days_payment: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        min_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Users,
                key: 'id',
            },
        },
        min_quantity: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = Rules_cashback_discounts;

const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Business = require('./users_business');
const Rules_cashback_discounts = require('./rules_cashback_discounts');

const Cashback_discounts = sequelize.define(
    'cashback_discounts',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        business_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Business,
                key: 'id',
            },
        },
        rule_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Rules_cashback_discounts,
                key: 'id',
            },
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
        },
        message: {
            type: DataTypes.STRING,
        },
        value: {
            type: DataTypes.DECIMAL(10, 2),
        },
        is_percentage: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: 'discount',
            description: 'discount or cashback',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = Cashback_discounts;

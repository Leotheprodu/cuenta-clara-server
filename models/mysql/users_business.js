const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Users = require('./users');

const Users_business = sequelize.define(
    'users_business',
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
    },
    {
        timestamps: true,
    },
);

module.exports = Users_business;
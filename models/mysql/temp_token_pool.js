const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Users = require('./users');

const Temp_token_pool = sequelize.define(
    'temp_token_pool',
    {
        id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
        },
        user_email: {
            type: DataTypes.STRING,
            references: {
                model: Users,
                key: 'email',
            },
        },
        token: {
            type: DataTypes.STRING,

            select: false,
        },
        type: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
        tableName: 'temp_token_pool',
    },
);

module.exports = Temp_token_pool;

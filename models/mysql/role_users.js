const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Users = require('./users');
const Roles = require('./roles');

const Role_users = sequelize.define(
    'role_users',
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
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Roles,
                key: 'id',
            },
        },
    },
    {
        timestamps: true,
    },
);

module.exports = Role_users;

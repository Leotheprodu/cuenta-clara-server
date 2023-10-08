const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Users = require('./users');

const Clients = sequelize.define(
    'clients',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cellphone: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        token: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Users,
                key: 'id',
            },
        },
        parent_user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Users,
                key: 'id',
            },
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        balance: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
        },
    },
    {
        timestamps: true,
        defaultScope: {
            attributes: { exclude: ['parent_user_id'] },
        },
    },
);
Clients.addScope('with_parent_user_id', {
    attributes: { include: ['parent_user_id'] },
});
module.exports = Clients;

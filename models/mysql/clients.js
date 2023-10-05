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
            allowNull: false,
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
        related_user: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Users,
                key: 'id',
            },
        },
        related_parent_user: {
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
    },
    {
        timestamps: true,
        defaultScope: {
            attributes: { exclude: ['related_parent_user'] },
        },
    },
);
Clients.addScope('with_related_parent_user', {
    attributes: { include: ['related_parent_user'] },
});
module.exports = Clients;

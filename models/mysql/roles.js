const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Roles = sequelize.define(
    'roles',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rol_name: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = Roles;

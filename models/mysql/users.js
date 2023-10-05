const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Users = sequelize.define(
    'users',
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
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            select: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        timestamps: true,
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
    },
);

Users.addScope('withPassword', {
    attributes: { include: ['password'] },
});
module.exports = Users;

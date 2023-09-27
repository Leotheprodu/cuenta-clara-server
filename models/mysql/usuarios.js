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
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            select: false,
        },
        active: {
            type: DataTypes.BOOLEAN, // Cambiamos TINYINT a BOOLEAN para representar un estado activo/inactivo de manera más clara
            defaultValue: true, // Definimos un valor predeterminado para active, si no se especifica al crear un usuario, será true
        },
    },
    {
        timestamps: true, // Esto generará automáticamente campos createdAt y updatedAt en la tabla
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
    },
);

Users.addScope('withPassword', {
    attributes: { include: ['password'] }, // Incluye el campo `password` en este scope
});
Users.addScope('activos', {
    where: { activo: 1 },
    attributes: { exclude: ['activo'] },
});
module.exports = Users;

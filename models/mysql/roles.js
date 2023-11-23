const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Roles = sequelize.define('roles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rol_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});
/* Roles.sync({ alter: true }); */
module.exports = Roles;

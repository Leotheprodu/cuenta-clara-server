const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Users = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      select: false,
      allowNull: false,
    },
    cellphone: {
      type: DataTypes.STRING(50),
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
  },
);

Users.addScope('withPassword', {
  attributes: { include: ['password'] },
});
/* Users.sync({ alter: true }); */
module.exports = Users;

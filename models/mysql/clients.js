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
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(50),
      defaultValue: '',
    },
    cellphone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    pin: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    country: {
      type: DataTypes.STRING(50),
    },
    detail: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['pin', 'token'] },
    },
  },
);
Clients.addScope('withPinAndToken', {
  attributes: { include: ['pin', 'token'] },
});
Clients.belongsTo(Users, {
  foreignKey: { name: 'user_id', allowNull: true },
});
Clients.belongsTo(Users, {
  foreignKey: { name: 'parent_user_id', allowNull: false },
});
Users.hasMany(Clients, { foreignKey: { name: 'user_id' } });
Users.hasOne(Clients, { foreignKey: { name: 'parent_user_id' } });
/* Clients.sync({ alter: true }); */
module.exports = Clients;

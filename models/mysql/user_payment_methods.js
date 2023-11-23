const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Users = require('./users');
const Payment_methods = require('./payment_methods');
const Users_business = require('./users_business');

const User_payment_methods = sequelize.define('user_payment_methods', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  payment_method_full_name: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  payment_method_cellphone: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  payment_method_iban: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  payment_method_email: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  payment_method_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
User_payment_methods.belongsTo(Users, {
  foreignKey: { name: 'user_id', allowNull: false },
});
User_payment_methods.belongsTo(Payment_methods, {
  foreignKey: { name: 'payment_method_id', allowNull: false },
});
User_payment_methods.belongsTo(Users_business, {
  foreignKey: { name: 'business_id', allowNull: false },
});
Users.hasMany(User_payment_methods, { foreignKey: { name: 'user_id' } });
Payment_methods.hasMany(User_payment_methods, {
  foreignKey: { name: 'payment_method_id' },
});
Users_business.hasMany(User_payment_methods, {
  foreignKey: { name: 'business_id' },
});
/* User_payment_methods.sync({ alter: true }); */
module.exports = User_payment_methods;

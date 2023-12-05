const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Users = require('./users');
const Payment_methods = require('./payment_methods');
const Payment_status = require('./payment_status');
const Clients = require('./clients');

const Transactions = sequelize.define('transactions', {
  id: {
    type: DataTypes.STRING(20),
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  date: {
    type: DataTypes.DATEONLY,
    defaultValue: new Date().toISOString().slice(0, 10),
  },
});
Transactions.belongsTo(Users, {
  foreignKey: { name: 'parent_user_id', allowNull: false },
});
Transactions.belongsTo(Clients, {
  foreignKey: { name: 'client_id', allowNull: false },
});
Transactions.belongsTo(Payment_methods, {
  foreignKey: { name: 'payment_method_id', allowNull: false },
});
Transactions.belongsTo(Payment_status, {
  foreignKey: { name: 'status_id', allowNull: false },
});
Users.hasMany(Transactions, { foreignKey: { name: 'parent_user_id' } });
Clients.hasMany(Transactions, { foreignKey: { name: 'client_id' } });
Payment_methods.hasMany(Transactions, {
  foreignKey: { name: 'payment_method_id' },
});
Payment_status.hasMany(Transactions, {
  foreignKey: { name: 'status_id' },
});
/* Transactions.sync({ alter: true }); */

module.exports = Transactions;

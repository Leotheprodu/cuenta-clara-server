const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Transactions = require('./transactions');
const Invoices = require('./invoices');

const Transaction_invoices = sequelize.define('transaction_invoices', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
Transactions.belongsToMany(Invoices, {
  through: Transaction_invoices,
});
Invoices.belongsToMany(Transactions, {
  through: Transaction_invoices,
});
/* Transaction_invoices.sync({ alter: true }); */

module.exports = Transaction_invoices;

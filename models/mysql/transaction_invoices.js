const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Transactions = require('./transactions');
const Invoices = require('./invoices');

const Transaction_invoices = sequelize.define(
  'transaction_invoices',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Transactions,
        key: 'id',
      },
    },
    invoiceId: {
      type: DataTypes.INTEGER,
      references: {
        model: Invoices,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Transaction_invoices;

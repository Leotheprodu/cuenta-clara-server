const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Invoices = require('./invoices');
const Products_and_services = require('./products_and_services');

const Invoice_details = sequelize.define(
  'invoice_details',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.DECIMAL(10, 2),
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    timestamps: true,
  },
);

Invoice_details.belongsTo(Invoices, {
  foreignKey: { name: 'invoiceId', allowNull: false },
});
Invoice_details.belongsTo(Products_and_services, {
  foreignKey: { name: 'code', allowNull: false },
  targetKey: 'code',
});
Invoices.hasMany(Invoice_details, { foreignKey: { name: 'invoiceId' } });
Products_and_services.hasMany(Invoice_details, {
  foreignKey: { name: 'code' },
});
/* Invoice_details.sync({ alter: true }); */
module.exports = Invoice_details;

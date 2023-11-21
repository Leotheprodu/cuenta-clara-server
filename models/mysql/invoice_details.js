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
    invoiceId: {
      type: DataTypes.INTEGER,
      references: {
        model: Invoices,
        key: 'id',
      },
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
    code: {
      type: DataTypes.STRING,
      references: {
        model: Products_and_services,
        key: 'code',
      },
    },
  },
  {
    timestamps: true,
  },
);
/* Invoice_details.belongsTo(Invoices, { foreignKey: 'invoiceId' }); */
/* Invoice_details.sync({ alter: true }); */
module.exports = Invoice_details;

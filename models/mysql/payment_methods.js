const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Payment_methods = sequelize.define(
  'payment_methods',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);
/* Payment_methods.sync({ alter: true }); */
module.exports = Payment_methods;

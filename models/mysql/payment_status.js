const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Payment_status = sequelize.define(
  'payment_status',
  {
    id: {
      type: DataTypes.TINYINT,
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
    tableName: 'payment_status',
  },
);
/* Payment_status.sync({ alter: true }); */
module.exports = Payment_status;

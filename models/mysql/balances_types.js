const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Balances_types = sequelize.define('balances_types', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(20),
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  extra: {
    type: DataTypes.DECIMAL(10, 2),
    comment: 'percentage of balance to add',
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
  },
});

Balances_types.sync({ alter: true });
module.exports = Balances_types;

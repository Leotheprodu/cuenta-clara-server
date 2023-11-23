const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Business = require('./users_business');
const Rules_cashback_discounts = require('./rules_cashback_discounts');

const Cashback_discounts = sequelize.define('cashback_discounts', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  message: {
    type: DataTypes.STRING,
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
  },
  is_percentage: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'discount',
    description: 'discount or cashback',
  },
});
Cashback_discounts.belongsTo(Business, {
  foreignKey: { name: 'business_id', allowNull: false },
});
Cashback_discounts.belongsTo(Rules_cashback_discounts, {
  foreignKey: { name: 'rule_id', allowNull: true },
});
Business.hasMany(Cashback_discounts, { foreignKey: { name: 'business_id' } });
Rules_cashback_discounts.hasMany(Cashback_discounts, {
  foreignKey: { name: 'rule_id' },
});
/* Cashback_discounts.sync({ alter: true }); */

module.exports = Cashback_discounts;

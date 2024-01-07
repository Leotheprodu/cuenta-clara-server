const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Clients = require('./clients');
const Balances = require('./balances');
const User_payment_methods = require('./user_payment_methods');
const Balances_types = require('./balances_types');

const Balances_recharges = sequelize.define('balances_recharges', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
  },
  balance_amount: {
    type: DataTypes.DECIMAL(10, 2),
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'pending',
  },
});
Balances_recharges.belongsTo(Clients, {
  foreignKey: { name: 'client_id', allowNull: false },
});
Balances_recharges.belongsTo(Balances, {
  foreignKey: { name: 'balance_id', allowNull: false },
});
Balances_recharges.belongsTo(User_payment_methods, {
  foreignKey: { name: 'user_payment_methods_id', allowNull: false },
});
Balances_recharges.belongsTo(Balances_types, {
  foreignKey: { name: 'balances_types_id', allowNull: false },
});
Clients.hasMany(Balances_recharges, { foreignKey: { name: 'client_id' } });
Balances.hasMany(Balances_recharges, { foreignKey: { name: 'balance_id' } });
User_payment_methods.hasMany(Balances_recharges, {
  foreignKey: { name: 'user_payment_methods_id' },
});
Balances_types.hasMany(Balances_recharges, {
  foreignKey: { name: 'balances_types_id' },
});
/* Balances_recharges.sync({ alter: true }); */
module.exports = Balances_recharges;

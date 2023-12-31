const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Clients = require('./clients');
const Balances = require('./balances');

const Balances_recharges = sequelize.define('balances_recharges', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
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
Clients.hasMany(Balances_recharges, { foreignKey: { name: 'client_id' } });
Balances.hasMany(Balances_recharges, { foreignKey: { name: 'balance_id' } });
/* Balances_recharges.sync({ alter: true }); */
module.exports = Balances_recharges;

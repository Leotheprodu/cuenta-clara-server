const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Clients = require('./clients');
const Balances = require('./balances');
const Invoices = require('./invoices');

const Balances_updates = sequelize.define('balances_updates', {
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
    allowNull: false,
    defaultValue: 'pending',
  },
});
Balances_updates.belongsTo(Clients, {
  foreignKey: { name: 'client_id', allowNull: false },
});
Balances_updates.belongsTo(Balances, {
  foreignKey: { name: 'balance_id', allowNull: false },
});
Balances_updates.belongsTo(Invoices);
Clients.hasMany(Balances_updates, { foreignKey: { name: 'client_id' } });
Balances.hasMany(Balances_updates, { foreignKey: { name: 'balance_id' } });
Invoices.hasMany(Balances_updates);
/* Balances_updates.sync({ alter: true }); */
module.exports = Balances_updates;

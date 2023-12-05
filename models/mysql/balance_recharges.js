const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Clients = require('./clients');
const Balances = require('./balances');

const Balance_recharges = sequelize.define('balance_recharges', {
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
Balance_recharges.belongsTo(Clients, {
  foreignKey: { name: 'client_id', allowNull: false },
});
Balance_recharges.belongsTo(Balances, {
  foreignKey: { name: 'balance_id', allowNull: false },
});
Clients.hasMany(Balance_recharges, { foreignKey: { name: 'client_id' } });
Balances.hasMany(Balance_recharges, { foreignKey: { name: 'balance_id' } });
/* Balance_recharges.sync({ alter: true }); */
module.exports = Balance_recharges;

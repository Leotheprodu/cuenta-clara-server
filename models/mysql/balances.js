const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Clients = require('./clients');
const Users_business = require('./users_business');

const Balances = sequelize.define(
  'balances',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    timestamps: true,
  },
);
Balances.belongsTo(Clients, {
  foreignKey: { name: 'client_id', allowNull: false },
});
Balances.belongsTo(Users_business, {
  foreignKey: { name: 'business_id', allowNull: false },
});
Clients.hasOne(Balances, { foreignKey: { name: 'client_id' } });
Users_business.hasMany(Balances, { foreignKey: { name: 'business_id' } });
/* Balances.sync({ alter: true }); */
module.exports = Balances;

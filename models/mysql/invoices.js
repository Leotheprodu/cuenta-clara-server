const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Users = require('./users');
const Clients = require('./clients');
const Users_business = require('./users_business');

const Invoices = sequelize.define('invoices', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
  },
  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: new Date().toISOString().slice(0, 10),
  },
});
Invoices.belongsTo(Users, {
  foreignKey: { name: 'parent_user_id', allowNull: false },
});
Invoices.belongsTo(Clients, {
  foreignKey: { name: 'client_id', allowNull: false },
});
Invoices.belongsTo(Users_business, {
  foreignKey: { name: 'business_id', allowNull: false },
});
Users.hasMany(Invoices, { foreignKey: { name: 'parent_user_id' } });
Clients.hasMany(Invoices, { foreignKey: { name: 'client_id' } });
Users_business.hasMany(Invoices, { foreignKey: { name: 'business_id' } });
/* Invoices.sync({ alter: true }); */
module.exports = Invoices;

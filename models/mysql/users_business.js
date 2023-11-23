const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Users = require('./users');

const Users_business = sequelize.define(
  'users_business',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'users_business',
  },
);
Users_business.belongsTo(Users, {
  foreignKey: { name: 'user_id', allowNull: false },
});
Users.hasMany(Users_business, { foreignKey: { name: 'user_id' } });
/* Users_business.sync({ alter: true }); */
module.exports = Users_business;

const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Users = require('./users');

const Activity_logs = sequelize.define('activity_logs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(50),
  },
  action: {
    type: DataTypes.STRING(50),
  },
  reference_id: {
    type: DataTypes.INTEGER,
  },
});
Activity_logs.belongsTo(Users, {
  foreignKey: { name: 'parent_user_id', allowNull: false },
});
Users.hasMany(Activity_logs, { foreignKey: { name: 'parent_user_id' } });

/* Activity_logs.sync({ alter: true }); */
module.exports = Activity_logs;

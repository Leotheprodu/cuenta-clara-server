const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const Activity_logs = sequelize.define('activity_logs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user: {
    type: DataTypes.STRING(6),
  },
  action: {
    type: DataTypes.STRING(50),
  },
  reference_id: {
    type: DataTypes.INTEGER,
  },
});

/* Activity_logs.sync({ alter: true }); */
module.exports = Activity_logs;

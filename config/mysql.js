const { Sequelize } = require('sequelize');
const { port, host, user, password, database } = require('./credentials');

const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: 'mysql',
    port: port,
});

const dbConnectMySql = async () => {
    try {
        await sequelize.authenticate();
        console.log('MYSQL Successfull Connection');
    } catch (e) {
        console.log('MYSQL Error Connection', e);
    }
};

module.exports = { sequelize, dbConnectMySql };

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
const dbSync = async () => {
    const env = process.env.NODE_ENV || 'development';
    try {
        if (env === 'development') {
            await sequelize.sync();
        }

        console.log('All models were synchronized successfully.');
    } catch (e) {
        console.log('Error Synchronizing models', e);
    }
};
module.exports = { sequelize, dbConnectMySql, dbSync };

const { Sequelize } = require('sequelize');

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = 'localhost';

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql',
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

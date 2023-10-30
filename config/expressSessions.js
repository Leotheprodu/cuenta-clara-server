const session = require('express-session');
const mysql = require('mysql2/promise');
const credentials = require('./credentials');
const { secret, environment } = require('./constants');
const connection = mysql.createPool(credentials);
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore({}, connection);

const sess = {
    key: 'sessionId',
    secret,
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 86400000,
        secure: environment === 'production',
        sameSite: environment === 'production' ? 'none' : false,
    },
};

module.exports = sess;

require('dotenv').config({ override: true });
const cors = require('cors');
const { dbConnectMySql } = require('./config/mysql');
const session = require('express-session');
const sess = require('./config/expressSessions');
const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(
    cors({
        origin: process.env.URL_CORS,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Origin',
            'X-Requested-With',
            'Accept',
            'x-client-key',
            'x-client-token',
            'x-client-secret',
            'Authorization',
        ],
        credentials: true,
    }),
);
app.use(session(sess));
app.use(express.json());
app.use('/api', require('./routes'));
const server = app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}...`);
});

server.timeout = 30000;
dbConnectMySql();

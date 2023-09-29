require('dotenv').config({ override: true });
const { dbConnectMySql } = require('./config/mysql');
const session = require('express-session');
const sess = require('./config/expressSessions');
const corsConfig = require('./config/cors');
const express = require('express');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const app = express();
app.use(cors(corsConfig));
app.use(session(sess));
app.use(express.json());
app.use('/api', require('./routes'));

const server = app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}...`);
});

server.timeout = 30000;
dbConnectMySql();

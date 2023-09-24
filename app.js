require('dotenv').config({ override: true });
const express = require('express');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
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
app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}...`);
});

server.timeout = 30000;

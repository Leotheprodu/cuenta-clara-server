const corsConfig = {
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
};
exports.default = corsConfig;

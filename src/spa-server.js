const path = require('path');

const serverFactory = require('spa-server');

const server = serverFactory.create({
    path: path.join(__dirname, '/build'),
    port: process.env.PORT || 3000,
    fallback: '/index.html',
    serveStaticConfig: {},
});

server.start();

// implement your server here
// require your posts router and connect it here
const express = require('express');

const apiRoutes = require('./apiRoutes');

const server = express();

server.use(express.json());
server.use('/api', apiRoutes);

module.exports = server;
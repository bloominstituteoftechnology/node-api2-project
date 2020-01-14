const express = require('express');

const routerMain = require('../routers/router-main.js');

const server = express();

server.use('/api/posts', routerMain)

server.get('/', (req, res) => {
    res.send(`<h1>**~Project~**</h1>`)
})

module.exports = server;
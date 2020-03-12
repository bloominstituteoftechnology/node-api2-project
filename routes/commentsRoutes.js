const express = require('express');
const server = express.Router();

server.get('/', (req, res) => {
    res.status(200).send('comment route working');
})

module.exports = server;
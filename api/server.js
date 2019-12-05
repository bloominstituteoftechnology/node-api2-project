const express = require('express');

const router = require('../posts/router.js');

const server = express()

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`Blog Post API`)
})

server.use('/api/posts', router);

module.exports = server;
const express = require('express');
const postsRouter = require('./data/posts-router.js');

const server = express();
server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send('Welcome to our blog! Verbatim Studios!');
});

module.exports = server;
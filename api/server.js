const express = require('express');

const postsRouter = require('../data/db-router');

const server = express();

server.use(express.json());

server.get('/', (req, res) =>{
    res.send(`hello from port 5000!`);
});

server.use('/api/posts', postsRouter);


module.exports = server;
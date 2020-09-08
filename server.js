const express = require('express');

const postsRouter = require('./posts-router');


const server = express();
server.use(express.json());
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>Hello World!</h2>
    `);
});

module.exports = server;
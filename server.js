const express = require('express');
const postsRouter = require('./posts/posts-router.js');

const server = express();
server.use(express.json());

server.use('/api/posts', postsRouter)

server.use('/', (req, res) => {
    res.send(`
        <h2>Lexi's Blog Posts API</h2>
        <p>Welcome to Lexi's Blog Posts Api</p>
    `);
});

module.exports = server;


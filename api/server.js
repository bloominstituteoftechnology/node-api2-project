const express = require('express');
const server = express();

// import post router
const postRouter = require('./posts-router');

// import middleware
server.use(express.json());
server.use('/api/posts', postRouter);

// root level message
server.get('/', (req, res) => {
    res.send(`<p>Server running...</p>`)
});

module.exports = server;
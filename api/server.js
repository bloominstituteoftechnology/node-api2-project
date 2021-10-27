// implement your server here
const express = require('express');
// require your posts router and connect it here
const postsRouter = require('./posts/posts-router');
const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);

module.exports = server;
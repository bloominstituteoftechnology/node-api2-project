// implement your server here
const express = require('express');
// require your posts router and connect it here
const PostsRouter = require('./posts/posts-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', PostsRouter);

module.exports = server;

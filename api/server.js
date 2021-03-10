// implement your server here
// require your posts router and connect it here

const express = require('express');

const server = express();
//teaching express how to parse json data
server.use(express.json());

const postsRouter = require('./posts/posts-router');

server.use(postsRouter);

module.exports = server;
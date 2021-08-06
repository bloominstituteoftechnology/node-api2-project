// implement your server here
const express = require('express');
const server = express();
const postRouter = require('./posts/posts-router.js');

server.use(express.json());
server.use("/api/posts", postRouter);

// require your posts router and connect it here


module.exports = server
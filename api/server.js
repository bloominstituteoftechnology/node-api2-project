const express = require('express')
const server = express();
const postRouter = require('./posts/posts-router');

server.use(express.json())
server.use('/api/posts',postRouter);



module.exports = server;
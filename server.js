const express = require('express');
const commentRouter = require('./api/comments/comment-router');
const postRouter = require('./api/Posts/post-router');
const server = express();

server.use(express.jons());
server.use('/api/comments', commentRouter)
server.use('./api/posts', postRouter)

module.exports = server


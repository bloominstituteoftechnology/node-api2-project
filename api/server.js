// implement your server here
// require your posts router and connect it here
// BUILD YOUR SERVER HERE
const express = require('express')
const postRouter = require('./posts/posts-router')
const server = express();
server.use(express.json());

server.use('/api/posts', postRouter)
module.exports = server
// implement your server here
// require your posts router and connect it here


//imports at top
const express = require('express');

const postRouter = require('./posts/posts-router');

//instance of express app
const server = express();

server.use(express.json());

server.use('/api/posts', postRouter)

//export
module.exports = server;
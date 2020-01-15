const express = require('express');

const postsRouter = require('../routers/posts-router.js')
const server = express();
server.use(express.json());

server.use('/api/posts', postsRouter) //anything that has '/api/posts' needs to use postsRouter



module.exports = server;
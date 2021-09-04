// implement your server here
const express = require('express');

// require your posts router and connect it here
const postRoutes = require('./posts/posts-router')

const server = express();
server.use(express.json())

server.use('/api/posts', postRoutes)

module.exports = server;
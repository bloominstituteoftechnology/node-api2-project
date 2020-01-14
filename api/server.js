const express = require('express');

const server = express();

const postsRouter = require('../posts/posts-router');

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`this stupid thing is working!`)
})

server.use('/api/posts', postsRouter)

module.exports = server;
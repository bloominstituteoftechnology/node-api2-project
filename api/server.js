const express = require('express');

const server = express();

const postsRouter = require('../posts/posts-router');

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`Working`)
})

server.use('/api/posts', postsRouter)

module.exports = server; 
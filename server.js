const express = require('express');

const postsRouter = require('./posts/posts-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send(`
        <h2>RD's API</h2>
        <p>Welcome to the Roberto's Blog Posts API</p>
      `);
  });

  module.exports = server;
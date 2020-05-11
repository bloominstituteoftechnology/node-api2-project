const express = require('express');

const postsRouter = require('./routers/posts-router.js');
const commentsRouter = require('./routers/comments-router');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);
server.use('/api/posts', commentsRouter);

server.get('/', (req, res) => {
  res.send(`Server is Running 🏃`);
});

module.exports = server;

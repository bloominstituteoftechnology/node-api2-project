const express = require('express');
const postRouter = require('./data/db-router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send('<h1>Hello from server</h1>');
});
module.exports = server;

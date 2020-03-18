const express = require('express');
const blogRouter = require('./blog-router');
const server = express();
server.use(express.json());
server.use('/api/posts', blogRouter);

server.get('/', (req, res) => {
  res.send('server is running');
});
module.exports = server;

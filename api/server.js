// implement your server here
// require your posts router and connect it here

const express = require('express');
const postRouter = require('./posts/posts-router')
const server = express();

server.use(express.json());

server.use('/api/posts', postRouter);


server.use('*', (req, res) => {
  res.status(404).send(`
    <h2>Lambda Shelter API</h2>
    <p>Ooops, can't find that resource!</p>
  `);
});

module.exports = server;

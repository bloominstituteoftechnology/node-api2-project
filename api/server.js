// implement your server here
// require your posts router and connect it here

const express = require('express');
const PostsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());
server.use(PostsRouter);

server.get('/', (req, res) => {
  const welcomeMsg = process.env.WMSG || 'Welcome to my API server!'
  res.status(200).json({ welcomeMsg })
});

module.exports = server;

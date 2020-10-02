const express = require('express');
const homeRouter = require('./home/home-router');
const postsRouter = require('./posts/posts-router');

const server = express();
const port = 3000;

server.use(express.json());
server.use(homeRouter);
server.use(postsRouter);







server.listen(port, () => {
  console.log(`server listening at port ${port}`);
})
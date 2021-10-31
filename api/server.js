// implement your server here
// require your posts router and connect it here
const express = require('express');

const server = express();

const postsRouter = require('./posts/posts-router')

server.use(express.json());

server.use(postsRouter);

server.listen(4000, () => {
    console.log('The server is running on port 4000');
});

module.exports = server
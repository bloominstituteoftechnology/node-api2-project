const express = require('express');
const postsRouter = require('../posts/posts-router');
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send("Server is working");
});

server.use('/api/posts', postsRouter);
module.exports = server; 
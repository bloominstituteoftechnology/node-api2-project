const express = require('express');
const cors = require('cors');
const postsRouter = require('../posts/posts-router');
const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    res.send("I am alive!");
});



server.use('/api/posts', postsRouter);
module.exports = server;
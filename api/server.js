const express = require('express');
const server = express();
server.use(express.json());
const postsRouter = require("../posts/posts-router.js")
server.use("/api/posts", postsRouter)
module.exports = server

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda api - Posts for Node project 2</h2>
  `);
});


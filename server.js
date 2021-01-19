const express = require("express");
const postsRouter = require('./posts/postsRouter')

const server = express();

PORT = 4000;

server.use(express.json());
server.use('/api/posts', postsRouter)

server.get("/", (req, res) => {
  res.send(`<h2>Blog server<h2>`);
});
module.exports = server;
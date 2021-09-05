const express = require("express");
const postsRouter = require("./posts/posts-router");

const server = express();
server.use(express.json());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send(`
  <h2> Stan tudor API </h2> 
  <p> Welcome </p>`);
});

module.exports = server;

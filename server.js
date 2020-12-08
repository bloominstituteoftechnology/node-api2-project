const express = require("express");

const postsRouter = require("./api/post-router");

const server = express();
server.use(express.json());

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send("Welcome to the other side");
});

module.exports = server;

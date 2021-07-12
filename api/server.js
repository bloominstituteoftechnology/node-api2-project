// implement your server here
// require your posts router and connect it here
const express = require("express");

const postsRouter = require("./posts/posts-router");
const server = express();
// const apiPostsRouter = require("../api/posts");

server.use(express.json());

server.use("/api/posts", postsRouter);

// server.use("/api/posts", apiPostsRouter);
server.get("/", (req, res) => {
  res.send(`
    <h1>Please work</h1>
    `);
});

module.exports = server;

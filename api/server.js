// implement your server here
// require your posts router and connect it here
const express = require("express");
const postsRouter = require("../api/posts/posts-router");
const apiPostsRouter = require("../api/posts");
const server = express();

server.use(express.json());

server.use("/api/posts/posts-router", postsRouter);

server.use("/api/posts", apiPostsRouter);

module.exports = server;

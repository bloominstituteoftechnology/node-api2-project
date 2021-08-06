// implement your server here
// require your posts router and connect it here
require("dotenv").config();
const express = require("express");
const server = express();
const helmet = require("helmet");
const postsRouter = require("./posts/posts-router");

server.use(express.json());
server.use(helmet());

server.use("/api/posts", postsRouter);

module.exports = server;

const express = require("express");
const postRouter = require("./posts/posts-router");
const server = express();
const CORS = require("cors");
server.use(express.json());
server.use(CORS());
server.use("/api/post", postRouter);

module.exports = server;

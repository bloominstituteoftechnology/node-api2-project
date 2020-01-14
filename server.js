// We need to import express
const express = require("express");
const postsRouter = require("./data/posts-router");

const server = express();
server.use(express.json());
server.use("/api/posts", postsRouter);
// we need to export the server
module.exports = server;

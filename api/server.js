// implement your server here
const express = require('express');
const postsRouter = require("./posts/posts-router.js")
const server = express();

server.use(express.json());
server.use("/api/posts", postsRouter)



module.exports = server;
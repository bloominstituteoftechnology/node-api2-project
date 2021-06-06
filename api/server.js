// build and implement your server here
// require your posts router and connect it here

// IMPORTS
const express = require("express");
const postRouter = require("./posts/posts-router.js");

// EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json());
server.use("/api/posts", postRouter);

module.exports = server;

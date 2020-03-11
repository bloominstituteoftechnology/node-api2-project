const express = require('express');

const postsRouter = require('../data/posts/posts-router')

const server = express();

server.use(express.json());

server.get("/", (req,res) => {
    res.send(`
    <h1>Hello</h1>
    `);
});

server.use("/api/posts", postsRouter);
module.exports  = server; 
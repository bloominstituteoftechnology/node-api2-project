const express = require("express");

const postsRouter = require("../posts/postsRouter");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);

server.get("/", (req,res) => {
    const query = req.query;
    console.log(query)
    res.status(200).json(query)
})

module.exports = server;
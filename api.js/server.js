const express = require("express");

const blogsRouter = require("../blogsPost/blogs-router")

const server = express()
server.use(express.json())

server.get("./", (req,res) =>{
    const query = req.query
    console.log("query", query)
    res.status(200).json(query)
});

server.use("/api/posts", blogsRouter)

module.exports = server
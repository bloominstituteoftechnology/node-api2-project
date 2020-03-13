const express = require("express");
const morgan = require("morgan")

const blogsRouter = require("../data/routers/blogs-router");
const commentRouter = require("../data/routers/commentRouter")

const server = express()
server.use(morgan("dev"))
server.use(express.json())
server.use("/api/posts", blogsRouter)
server.use("/api/comments", commentRouter)


server.get("/", (req,res) => {
    res.status(200).json({message: "Hello World"})
})

module.exports = server
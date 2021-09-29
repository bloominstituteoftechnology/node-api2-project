const express = require("express")
const postsRouter = require('./posts/posts-router')
const server = express()

server.use(express.json())
server.use("/api/posts", postsRouter)

server.use("*", (req, res) => {
	res.status(404).json({
		message: "not found",
	});
});

module.exports = server;
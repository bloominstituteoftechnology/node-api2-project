// implement your server here
// require your posts router and connect it here
const express = require("express")
const postRouter = require("./posts/posts-router.js")
const server = express()

server.use(express.json());
server.use("/posts/posts-model.js", postRouter)

server.get("/", (req,res) =>{
	res.send('hello there')
})

module.exports = server;

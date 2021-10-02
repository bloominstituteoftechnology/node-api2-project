// implement your server here
const express = require("express")
const server = express();
const postsRouter = require("./posts/posts-router")
// require your posts router and connect it here
server.use(express.json());
server.use("/api/posts", postsRouter)



//test endpoint
// server.get('*', (req,res)=>{
// res.status(200).send('<h1>Hello</h1>')
// })


module.exports = server;
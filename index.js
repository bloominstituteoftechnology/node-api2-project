const express = require('express')
const server = express()
const postsRouter = require("./data/posts-router")
server.use(express.json());


server.get('/', (req,res)=>{
    res.json({ query: req.query, params: req.params, headers: req.headers });
})

server.use("/api/posts", postsRouter)

server.listen(8000, ()=> console.log('server is up'))
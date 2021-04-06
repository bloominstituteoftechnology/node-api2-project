// implement your server here
// require your posts router and connect it here
const express = require("express")
const server = express()
const postRouter = require("./posts/posts-router.js")

server.use(express.json())
server.use("/api/posts", postRouter)

server.use("/", (req, res)=>{
    res.send(`
        <h1>Default routing</h1>
        <p>No path specified</p>
    `);
})

module.exports = server
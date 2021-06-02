// implement your server here
// require your posts router and connect it here

const express = require("express")
const postsRouter = require('./posts/posts-router')
const server = express()

server.use(express.json())

server.use('/api/posts', postsRouter)

server.use('*', (req, res) => {
    res.status(404).json({
        message: "does not exist"
    })
})

module.exports = server
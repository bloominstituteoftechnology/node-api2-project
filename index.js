const { Router } = require('express')
const express = require('express')
const posts = require('./posts/posts-router')

const server = express()
const port = 4000

server.use(express.json())
server.use('/api/posts', posts)

server.get("/", (req,res) => {
    res.json({
        message: "Welcome To My Posts API!"
    })
})
server.listen(port, () => {
    console.log(`server running on ${port}`)
})
// implement your server here
const express = require('express')
const postsRouter = require('./posts/posts-router.js')
const server = express()
server.use(express.json())

server.use('/api/posts', postsRouter)
// require your posts router and connect it here

server.use('*', (req, res) => { 
    res.status(404).json({
        message: 'not found'
    })
})
module.exports = server; 
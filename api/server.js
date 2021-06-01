// implement your server here
// require your posts router and connect it here
const express = require('express')

const server = express()

const postRouter = require('./posts/posts-router')

server.use(express.json())

server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
    res.status(404).send(`What's going on boys.`)
})

module.exports = server

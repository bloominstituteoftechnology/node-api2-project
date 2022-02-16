// implement your server here
// require your posts router and connect it here

const express = require('express')

const server = express()
const postsRouter = require('./posts/posts-router')

server.use(express.json())
server.use('/api/posts', postsRouter)


server.get('/', (req, res) => {
  res.send(`welcome to this api`)
})

module.exports = server
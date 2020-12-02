const express = require('express')
const server = express()


const postsRouter = require('./posts-router')
const commentsRouter = require('./comments-router')
server.use(express.json())

server.use('/api/posts', postsRouter)
server.use('/api/posts', commentsRouter)

server.use('/', (req, res) => {
    res.send('hello')
})

server.listen(4000, () => {
    console.log('Server running on 4000 :) ')
})

module.exports = server
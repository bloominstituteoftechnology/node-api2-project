// implement your server here
// require your posts router and connect it here
const express = require('express')
const postsRouter = require('./post/posts-router')
const server = express()
server.use(postsRouter)
module.exports = server
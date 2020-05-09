const express = require('express');
const postsRouter = require("./postsRouter")
const commentsRouter = require("./commentsRouter")

const server = express();


server.use(express.json())

// can mount different urls to same router

// can also use a http verb as a method call to server to use that specified verb in the router
server.use('/api/posts', postsRouter)
server.use('/api/posts', commentsRouter)

module.exports = server;
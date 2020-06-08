const express = require('express')
const server = express();

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

const blogRouter = require('./posts/blogPostAPI')


server.use('/api/posts/', blogRouter)

server.listen(8000, () => console.log("=== Server 8000 ==="))



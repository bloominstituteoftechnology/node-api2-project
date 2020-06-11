const express = require('express')
const server = express();
const port = process.env.PORT || 5000

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

const blogRouter = require('./posts/blogPostAPI')


server.use('/api/posts/', blogRouter)

server.listen(port, () => console.log("=== Server 5000 ==="))



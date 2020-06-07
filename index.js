const express = require('express')
const server = express();

const blogRouter = require('./posts/blogPostAPI')


server.use(express.json())
server.use('/api/posts/', blogRouter)

server.listen(8000, () => console.log("=== Server 8000 ==="))
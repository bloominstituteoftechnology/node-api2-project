const express = require("express")

const postsRouter = require("./posts/posts-router")

const server = express()
const port = 9000

server.use(express.json())

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
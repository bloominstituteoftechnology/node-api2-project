const express = require("express")

const server = express()
const port = 3000

const postRouter = require("./posts/posts-router")

server.use(express.json())
server.use(postRouter)
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
const express = require("express")

const userPosts = require("./data/posts/user-posts")


const server = express()
const port = 3000

server.use(express.json())
server.use(userPosts)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
// require your server and launch it here
const express = require("express")

const postsRouter = require("./posts/posts-router")

const server = express()
const port = 9000

server.use(express.json())
server.use("/posts", postsRouter)

server.get("/", (req, res) => {
    res.json({
        message: "Welcome to our API",
    })
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
}) 
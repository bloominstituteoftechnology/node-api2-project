const express = require("express")
const postRouter = require('./routers/posts')
const commentRouter = require('./routers/comments')

const server = express()

server.use(express.json())
server.use("/", postRouter)
server.use("/api/", commentRouter)

// const port = 5000
// const host = '127.0.0.1'

// server.listen(port, host () => {
//     console.log(`Server running at http://${host}:${port}`)
// })
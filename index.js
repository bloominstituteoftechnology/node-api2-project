const express = require('express')
const postRouter = require('./post/posts')

const server = express()
const port = 5000

server.use(express.json())
server.use(cors())
server.use(postRouter)


server.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})
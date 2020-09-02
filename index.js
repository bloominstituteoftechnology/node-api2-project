const express = require('express')
const userRouter = require('./users/user-router')

const server = express()

server.use(express.json())

server.use('/api/posts', userRouter)

server.listen(5000, () => {
    console.log('Server running on 5000')
})
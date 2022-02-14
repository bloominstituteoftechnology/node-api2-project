// implement your server here
// require your posts router and connect it here
const express = require('express')

const server = express()

server.use(express.json())

const postRoute = require('./posts/posts-router')

server.use('/api/posts', postRoute)

server.get('/', (req, res) =>{
    res.send(`
        <h2>Welcome user</h2>
    `)
})


module.exports = server;

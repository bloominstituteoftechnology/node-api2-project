// implement your server here
// require your posts router and connect it here

require('dotenv').config();

const path = require('path')
const express = require('express');

const postsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());
server.use(express.static(path.join(__dirname, 'api/build')))

if(process.env.NODE_ENV !== 'development') {
    const cors = require('cors');
    server.use(cors());
}
server.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'api/build', 'index.html'))
})

server.use('/api/posts', postsRouter)


module.exports = server;
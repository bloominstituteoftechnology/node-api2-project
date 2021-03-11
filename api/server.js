// implement your server here
// require your posts router and connect it here

require('dotenv').config();

const express = require('express');

const postsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());

if(process.env.NODE_ENV !== 'production') {
    const cors = require('cors');
    server.use(cors());
}

server.use('/api/posts', postsRouter)


module.exports = server;
// implement your server here
// require your posts router and connect it here
const postsRouter = require('./posts/posts-router');
const express = require('express');
const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter)






server.use('*',(req,res) => {
    res.status(404).json({message:'page not found'})
})
module.exports = server;
// implement your server here
// require your posts router and connect it here
// BUILD YOUR SERVER HERE

const postRouter = require('./posts/posts-router')
const server = require('express').express();
server.use(express.json());

server.use(postRouter)
const express = require('express');


const postsRouter = require('./data/posts-router.js')

const server = express();



server.use(express.json()); // gives Express the ability to parse the req.body
server.use(postsRouter)
server.get('/', (req, res) => {
  
});


// common.js equiv of export default
module.exports = server

const express = require('express'); 

const myServer = express(); 
const postsRouter = require('./posts/posts-router');

myServer.use(express.json()); 
myServer.use('/api/posts', postsRouter); 

myServer.get('/', (req, res) => {
    res.send(`<h1>Hello there, from myServer in server.js</h1>`);
})

module.exports = myServer;
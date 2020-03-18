const express = require('express');
const postsRouter = require('../posts/post-router.js');
const server = express();
server.use(express.json());

//This just shows me something on my local host screen/when I deploy
server.get('/', (req, res) => {
    res.send(' <h2>Butts...</h2>');
});
server.use('/api/posts', postsRouter);

module.exports = server;
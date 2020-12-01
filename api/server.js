const express = require('express');
const server = express();

// import adopters router into server.js
const postRouter = require('../api/posts/post-router');

// takes care of CORS errors hopefully
server.use(express.json()); // if req has json in body, it can be parsed and put inside req.body

server.use('/api/posts', postRouter);



server.get('/', (req, res) => {
    res.send(`
    <h1> Hi </h1>
  `);
});

module.exports = server
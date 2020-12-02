const express = require('express');
const cors = require('cors');
const server = express();

// import adopters router into server.js
const postsRouter = require('./posts/posts-router');

server.use(cors()) // takes care of CORS errors hopefully
server.use(express.json()); // if req has json in body, it can be parsed and put inside req.body
server.use('/api/posts', postsRouter);




server.get('/', (req, res) => {
    res.send(`
      <h2>Node 2 Project</h>
      <p>this is an ineffective test</p>
    `);
  });

module.exports = server


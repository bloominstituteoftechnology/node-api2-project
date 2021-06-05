// implement your server here
const express = require('express');
// require your posts router and connect it here
const postRouter = require('./posts/posts-router.js');


const server = express();

server.use(express.json());
server.use('/api/posts', postRouter);


server.get('/', (req, res) => {
    res.send(`
      <h2>Server is working</h>
    `);
  });


module.exports = server;
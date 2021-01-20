const express = require('express');
const postsRouter = require('./data/posts-router.js');
const server = express();


server.use(express.json()); 


server.use('/api/posts', postsRouter);
// server.use(server.router);
// OTHER ENDPOINTS 
server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome and here is the API for get</p>
  `);
});
// postsRouter.initialize(server);
// we expose the server
module.exports = server

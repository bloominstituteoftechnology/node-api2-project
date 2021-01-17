const express = require('express');
const postsRouter = require('./posts/posts-router.js');
const server = express.Router();


server.use(express.json());
//Router.use() requires a middleware function

// server.use(server.router);
server.use('/api/posts', postsRouter);

// OTHER ENDPOINTS
// OTHER ENDPOINTS
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

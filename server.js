
const express = require('express');
const server = express();
const blogRouter = require('./data/blog-router.js')
// const usersRouter = require('./users/users-router.js')

server.use(express.json());
server.use('/api/posts', blogRouter);
server.use('/myapi/theposts', blogRouter);
// server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  const {name = 'user' } = req.query;  
  res.send(`
    <h2>Lambda Blog Post API</h>
    <p>Welcome ${name} to the Lambda Posts API</p>
  `);
});



module.exports = server;
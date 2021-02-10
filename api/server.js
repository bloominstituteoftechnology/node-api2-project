// implement your server here
// require your posts router and connect it here
const express = require('express')
const postsRouter = require('./posts/posts-router')

const server = express()

server.use(express.json())
server.use('/api/posts', postsRouter)

// OTHER ENDPOINTS
server.get('/', (req, res) => {
    res.send(`
      <h2>Tara's Afternoon Project API</h>
      <p>Welcome to Tara's Afternoon Project API</p>
    `);
  });

module.exports = server;
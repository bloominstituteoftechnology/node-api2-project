const express = require('express');
const postsRouter = require('../routes/postsRouter');
const cors = require('cors');
const server = express();

server.use(cors());
server.use(express.json());
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});



module.exports = server;
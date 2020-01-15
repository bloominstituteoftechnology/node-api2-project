const express = require('express');
const postsRouter = require('./postsRouter.js');

const server = express();

// ** Middleware **
server.use(express.json());
// server.user(cors());

// Requests answered in this file
server.get('/', (req, res) => {
  res.send(`I'm a server and I'm okay.
  I work all night and I work all day`);
});

// External Routes
server.use('/api/posts', postsRouter);

module.exports = server;
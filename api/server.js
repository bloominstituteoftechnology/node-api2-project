const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`IM ALIVE!`)
})

module.exports = server;
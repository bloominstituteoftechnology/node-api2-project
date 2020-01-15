const express = require('express');

const db = require('./data/db');

const router = require('./router')

const server = express();





server.get('/', (req, res) => {
  res.send(`
    <h2>Aasa API</h>

  `);
});

server.use('/api/post', router)

module.exports = server;

const express = require('express');

const db = require('./data/db');

const router = require('./router')

const server = express();

server.use(express.json());





server.get('/', (req, res) => {
  res.send(`
    <h2>Aasa API</h>

  `);
});

server.use('/api', router)

module.exports = server;

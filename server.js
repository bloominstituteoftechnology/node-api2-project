const express = require('express');
const hubsRouter = require('./data/hubs-router.js')
const dbs = require('./data/db.js')

const server = express();
server.use(express.json());
server.use('/api/posts', hubsRouter)


module.exports = server
const express = require('express')
const dbRouter = require('./data/db-router')

const server = express()

server.use(express.json())
server.use(dbRouter)

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Post API</h2>
    <p>Welcome to the Lambda Post API</p>
    `);
});

module.exports = server
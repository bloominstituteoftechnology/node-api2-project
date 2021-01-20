const express = require ('express');
const server = express();
const dbRouter = require("./Express Router/express-router");

server.use(express.json());
server.use('/api/posts', dbRouter);

server.get('/', (req,res) => {
    res.json('API 2')
});

module.exports = server;
const express = require('express');
const dbRouter = require('../db/db-router')
const server = express();


server.use(express.json());//MIDDLEWARE

server.get('/', (req, res)=>{
    const query = req.query;
    res.send(200).json(query);
})

server.use('/api/posts', dbRouter);

module.exports = server;
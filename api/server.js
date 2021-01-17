
const express = require('express');

const LOTRRouter = require('./lotr-router.js');

const server = express();


server.use(express.json());

server.use('/lotr', LOTRRouter);


server.get('/', (req, res) => {
    console.log(req)

    res.json({message: "hello world!"});
})

module.exports = server;
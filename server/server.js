const express = require('express');
const cors = require('cors');
const server = express();

// import routes

server.use(cors())
server.use(express.json())

server.use('/api/posts',(req, res) => {
    res.status(200).json({message: 'test'})
})

module.exports = server
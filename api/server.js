const express = require('express');

const noteRoute = require('../new/newRoutes');
const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send(`<h1>Class Project</h1>
            <p>Welcome to the blog</p>`)
})

server.use("/api/posts", noteRoute)

module.exports = server;
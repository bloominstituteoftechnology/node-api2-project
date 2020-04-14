const express = require('express');

const db = require("./data/db")
const server = express();

const postRoutes = require('./routers/postRoutes')
const port = 5000

server.use(express.json())
server.use('/api/posts', postRoutes)

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
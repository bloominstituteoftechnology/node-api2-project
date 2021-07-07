// implement your server here
// require your posts router and connect it here

const express = require("express")

const port = 5000;

const server = express();



server.get("/api/", (req, res) => {
    res.send("hello")
})

server.listen(4000, () => {
    console.log(`server listeing on port ${port}`)
})

// an expression of connecting middlewares
server.use(express.json())

module.exports = server;
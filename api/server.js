// implement your server here=
const express = require('../node_modules/express')
const postsRouter = require('./posts/posts-router')
const server = express();
server.use(express.json());
// require your posts router and connect it here
server.use("/api/posts", postsRouter)

server.get('/', (req, res) => {
    res.send(`
    <h2>Lambda Posts API</h2>
    <p>Welcome to the Lambda posts API</p>
    `)
});




module.exports = server;
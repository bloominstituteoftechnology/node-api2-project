// implement your server here
// require your posts router and connect it here
const express = require("express");
const postsRouter = require("./posts/posts-router");

const server = express();

server.use(express.json());
server.use(postsRouter);

server.get("/", (req, res) => {
	res.send(`
    <h2>Lambda Posts API</h>
    <p>Welcome to the Lambda Posts API</p>
  `);
});

// common.js equiv of default export
module.exports = server;

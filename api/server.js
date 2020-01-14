const express = require("express");

const postsRouter = require("../posts/postsRouter");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h2>Node api project #2</h>
   
  `);
});

server.use("/api/posts", postsRouter);

module.exports = server;

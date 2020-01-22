const express = require("express");
const server = express();
const cors = require("cors");

const postRouter = require("./posts-router.js");

// Global Setting
server.use(express.json());
server.use(cors());
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`
    <h1 style="text-align: center; color: blue"> Welcome to Lambda School Posts APIs</h1>
    `);
});

module.exports = server;

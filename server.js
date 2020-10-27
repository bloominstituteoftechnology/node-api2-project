const express = require("express");

const server = express();

PORT = 4000;

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
        <h2>Blog server<h2>
    `);
});

module.exports = server;

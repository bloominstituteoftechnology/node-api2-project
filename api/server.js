const express = require("express");

const server = express();

const dbRouter = require("../data/db-router.js");

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h1> Hello World! </h1>`);
});

server.use("/api/posts", dbRouter);

module.exports = server;

const express = require("express");
const router = require("./hubs/routing");

const server = express();

server.use(express.json());
server.use(router);

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

module.exports = server;

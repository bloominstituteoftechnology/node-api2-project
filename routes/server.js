const express = require("express");
const expressRouter = require("./router");

const server = express();

server.use(express.json());
server.use("/api/posts", expressRouter);

server.get("/", (req, res) => {
  res.send(
    `<h1>Learning router-Side Routing</h1> <p>New stuff node.js and express.js</p>`
  );
});

module.exports = server;

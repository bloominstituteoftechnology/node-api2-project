const express = require("express");
const cors = require("cors");
const dbRouter = require("../data/db-router");

server = express();
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  const query = req.query;
  res.status(200).json(query);
});

server.use("/api/posts", dbRouter);

module.exports = server;

const express = require("express");

const router = require("./router");

const server = express();

server.use(express.json());

server.get("/", (req, res) => res.send("Assuh, World"));

server.use("/api/posts", router);

module.exports = server;

const express = require("express");
const post = require("./routes/post.js");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Server running");
});

server.use("/api/posts", post);

module.exports = server;

const express = require("express");
const hubsRouter = require("./hubs/hubs-router");
const apiPostRouter = require("./post/api-posts-router");
const server = express();
// const Posts = require('./data/db');
server.use(express.json());

server.use("/api", apiPostRouter);

server.get("/", (req, res) => {
  res.send(`<h2>My Posts API</h2>
  <p>Welcome to my API</p>`);
});

server.listen(5000, () => {
  console.log("\n*** Server running on http://localhost:5000 ***\n");
});

const express = require("express");

const postRouter = require("./post/post-router");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h2>
    <h4>Welcome to Lambda Posts API</h4>
    `);
});

server.use("/api/posts", postRouter);

server.listen(5000, () => {
  console.log("runing 5000");
});
const express = require("express");

const postsRouter = require("./posts/postsRouter");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Root of API");
});

server.use("/api/posts", postsRouter);

server.listen(5000, () => {
  console.log("Server is listening on http://localhost:5000");
});

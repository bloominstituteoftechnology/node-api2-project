const express = require("express");
const postsRouter = require("./posts-router");

const server = express();
const port = 4000;

server.use(express.json());

server.use(postsRouter);

server.get("/", (req, res) => {
  res.json({
    message: "Welcome to our API",
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

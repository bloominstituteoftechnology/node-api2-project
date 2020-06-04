const express = require("express");

const postRouter = require("./data/posts/posts-router");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Blog</h2>
    <p>Posts API's Node.js Code!</p>`);
});

server.use("/api/posts", postRouter);

server.listen(6000, () => {
  console.log("\n*** Server Running on http://localhost:6000 ***\n");
});

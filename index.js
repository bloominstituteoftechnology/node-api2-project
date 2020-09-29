const express = require("express");
const postRouter = require("./posts/posts-router");
const server = express();

server.use(express.json());
server.use("/posts", postRouter);

server.get("/", (req, res) => {
  res.status(200).json({ data: "working" });
});

const port = 5000;

server.listen(port, () => {
  console.log("\n*** Server Running on http://localhost:5000 ***\n");
});

const express = require("express");
const postsRouter = require("./posts/posts-router.js");
const server = express();

server.use(express.json());
server.use("/api/posts", postsRouter);

const port = 5000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});

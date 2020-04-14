const express = require("express");
const postsRouter = require("./Posts/posts-routes");
const db = require("./data/db");

const server = express();

server.use(express.json());
server.use("/api/posts", postsRouter);

server.listen(8000, () => {
  console.log("Server has been intialized on port 8000...");
});

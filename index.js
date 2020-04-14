const express = require("express");
const postsRouter = require("./Posts/posts-routes");

const server = express();

server.use(express.json());
server.use("/api/posts", postsRoutes);

server.listen(8000, () => {
  console.log("Server has been intialized on port 8000...");
});

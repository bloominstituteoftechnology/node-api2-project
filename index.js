const express = require("express");
const postRoutes = require("./posts/postRoutes");

const server = express();

server.use(express.json());
server.use(postRoutes);

server.listen(4000, () => {
  console.log("server listening on port 4000");
});

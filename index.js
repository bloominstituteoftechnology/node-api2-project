const express = require("express");
const posts = require("./posts");

const server = express();
server.use(express.json());
server.use("/api/posts", posts);

server.listen(5001, () => {
    console.log("Server listening on port 5001");
})
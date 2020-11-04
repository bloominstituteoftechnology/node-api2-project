const express = require("express");
const server = express();
const welcomeRouter = require("./welcomeRouter/welcome-router");
const postsRouter = require("./postsRouter/posts-routers");
const { post } = require("./welcomeRouter/welcome-router");

server.use(express.json());

//WELCOME ROUTER
server.use("/", welcomeRouter);

//CRUD /api/posts
server.use("/api/posts", postsRouter);

server.listen(8000, () => {
  console.log("****Server is listening on PORT: ", 8000);
});

const express = require("express"); // importing express
const postsRouter = require("./posts/posts-router"); // importing posts-router

const server = express(); //creating express server
server.use(express.json()); // making server to use express.json middleware

// router
server.use("/api/posts", postsRouter); // using posts-router endpoints

// server/port listen
const port = 8000;
server.listen(port, () => {
  console.log(` Server Running on port ${port} `);
});

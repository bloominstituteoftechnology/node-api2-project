const express = require("express");
const server = express();

const port = 3200;
//imports welcome-router.js
const welcomeRouter = require("./welcome/welcome-router");
const postRouter = require("./posts/post-router");

server.use(express.json());
//allows server to use welcomeRouter
server.use(welcomeRouter);
server.use(postRouter);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

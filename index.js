const express = require("express");
const server = express();

const port = 3200;
//imports welcome-router.js
const welcomeRouter = require("./welcome/welcome-router");

server.use(express.json());
//allows server to use welcomeRouter
server.use(welcomeRouter);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

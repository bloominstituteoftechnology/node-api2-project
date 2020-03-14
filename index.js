const express = require('express');
const welcomeRouter = require("./welcome/welcome-router")
const hubsRouter = require("./hubs/hubs-router")

const server = express();

server.use(express.json());
server.use("/", welcomeRouter);
server.use("/api/posts", hubsRouter);

server.listen(4000, () => {
  console.log('\n*** Server running on http://localhost:4000 *** \n');
})
const express = require("express");

const dbRouter = require("./data/db-router.js");

const server = express();

server.use(express.json());

server.use("/api/posts", dbRouter);

server.listen(5000, () => {
  console.log("\n*** Server Running on http://localhost:5000 ***\n");
});

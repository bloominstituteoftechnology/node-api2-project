const express = require("express");
const server = express();

server.use(express.json());

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
const express = require("express");

const server = express();
const port = 8080;

server.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

server.listen(port, () => {
  console.log(`API is listining on port${port}`);
});

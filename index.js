const express = require("express");
const router = require("./router");

const server = express();
const port = 8000;

server.use(express.json());

server.use(router);

server.get("/", (req, res) => {
  res.json({
    message: "Welcome",
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

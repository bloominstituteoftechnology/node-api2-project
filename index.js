const express = require('express');

const server = express();
server.use(express.json());

const port = 3000;

server.get("/", (req, res) => {
  res.send("MY API SERVER")
})



server.listen(port, () => {
  console.log(`server listening at port ${port}`);
})
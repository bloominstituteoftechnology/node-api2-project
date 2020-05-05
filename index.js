const express = require("express");

const dataRouter = require('./data/dataRouter');

const server = express();

server.use(express.json());

server.use('/api/posts', dataRouter);

server.get("/", (req, res) => {
  res.json({ query: req.query, params: req.params, headers: req.headers });
});

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});

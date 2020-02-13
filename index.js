const express = require("express");

const dbRouter = require("./data/db-router.js");

const server = express();

server.use(express.json());

server.use("/api/posts", dbRouter);

server.get('/', (req, res) => {
  res.send(`
  <h2>Deployed API</h2>
  `)
})

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});

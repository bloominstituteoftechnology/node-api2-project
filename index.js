const express = require("express");

const apiRouter = require("./api/api-router.js"); // << added

const server = express();

server.use(express.json()); // needed to parse JSON from the body

// for URLs beginning with /api
server.use("/api", apiRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Node Day 2 Project</p>
  `);
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});

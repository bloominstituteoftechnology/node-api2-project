
const express = require("express");

const apiRouter = require("./data/api-router.js"); 

const server = express();

server.use(express.json()); 



server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});
server.use("/api", apiRouter);

const port = 3000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});